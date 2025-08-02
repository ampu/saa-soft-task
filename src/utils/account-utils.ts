import {nanoid} from 'nanoid'

type ValueOf<T> = T[keyof T]

export const AccountTypes = {
  LOCAL: `local`,
  LDAP: `ldap`,
} as const

export type AccountType = ValueOf<typeof AccountTypes>

export const ACCOUNT_TYPES = Object.values(AccountTypes)
export const ACCOUNT_TYPE_TO_INFO = {
  [AccountTypes.LOCAL]: {
    title: `Локальная`,
  },
  [AccountTypes.LDAP]: {
    title: `LDAP`,
  },
}

export type AccountLabel = {
  text: string
}

export type Account = {
  id: string
  labels: AccountLabel[]
  type: AccountType
  login: string
  password: string | null
  isNew?: boolean
}

export const createNewAccount = (): Account => {
  return {
    id: nanoid(),
    labels: [],
    type: AccountTypes.LOCAL,
    login: ``,
    password: ``,
    isNew: true,
  }
}

export const stringifyLabels = (labels: AccountLabel[]) => {
  return labels.map((label) => label.text).join(`; `)
}

export const parseLabels = (labelsString: string): AccountLabel[] => {
  return labelsString
    .split(`;`)
    .map((label) => label.trim())
    .filter(Boolean)
    .map((label) => ({text: label}))
}
