import {type Account} from './account-utils'

const ACCOUNT_STORAGE_KEY = `saa-soft-task/accounts`

class AccountStorage {
  constructor(
    private _storage: Storage,
    private _itemsKey: string
  ) {
  }

  getItems(defaultValue: Account[] = []): Account[] {
    try {
      return JSON.parse(this._storage.getItem(this._itemsKey) ?? ``) || defaultValue
    } catch (_error) {
      return defaultValue
    }
  }

  setItems(items: Account[]) {
    try {
      this._storage.setItem(this._itemsKey, JSON.stringify(items))
      return true
    }
    catch (_error) {
      return false
    }
  }
}

export const accountStorage = new AccountStorage(localStorage, ACCOUNT_STORAGE_KEY)
