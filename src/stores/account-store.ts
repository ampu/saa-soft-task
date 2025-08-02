import {defineStore} from 'pinia'
import {ref, watch} from 'vue'
import {type Account} from '../utils/account-utils'
import {accountStorage} from '../utils/account-storage'

export const useAccountStore = defineStore(`account`, () => {
  const accounts = ref<Account[]>(accountStorage.getItems())

  watch(accounts, () => {
    accountStorage.setItems(accounts.value.filter((account) => !account.isNew))
  }, {
    deep: true,
  })

  const addAccount = (account: Account) => {
    accounts.value.push(account)
  }

  const updateAccount = (account: Account) => {
    const index = accounts.value.findIndex((it) => it.id === account.id)
    if (index !== -1) {
      accounts.value[index] = account
    }
  }

  const removeAccount = (accountId: Account['id']) => {
    const index = accounts.value.findIndex((it) => it.id === accountId)
    if (index !== -1) {
      accounts.value.splice(index, 1)
    }
  }

  return {
    accounts,
    addAccount,
    updateAccount,
    removeAccount,
  }
})
