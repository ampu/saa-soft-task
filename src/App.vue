<template>
  <div class="app container">
    <header class="app__header">
      <h1 class="app__header-title">Учетные записи</h1>
      <button
        class="app__add-button"
        type="button"
        @click="accountStore.addAccount(createNewAccount())"
      >
        +
      </button>
    </header>

    <p class="app__note">
      <IMdiHelpCircleOutline/>
      Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
    </p>

    <table class="app__table">
      <colgroup>
        <col width="25%"/>
        <col/>
        <col width="25%"/>
        <col width="25%"/>
        <col width="40px"/>
      </colgroup>
      <thead>
      <tr>
        <th>Метки</th>
        <th>Тип записи</th>
        <th>Логин</th>
        <th>Пароль</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <AccountRow
        v-for="account in accountStore.accounts"
        :key="account.id"
        :account="account"
        @save="accountStore.updateAccount($event)"
        @remove="accountStore.removeAccount(account.id)"
      />
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import {useAccountStore} from './stores/account-store'
import {createNewAccount} from './utils/account-utils'

const accountStore = useAccountStore()
</script>

<style lang="scss">
.app {
  &__header {
    display: flex;
    gap: 15px;
    align-items: center;
    margin-bottom: 16px;
  }

  &__header-title {
    margin: 0;
  }

  &__add-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 34px;
    height: 34px;
    font-size: 24px;
    border: 1px solid #cad8e3;
    border-radius: 5px;
    background: none;
  }

  &__note {
    margin-bottom: 24px;
    padding: 2px 4px;
    border-radius: 5px;
    background-color: #eef4fb;
  }

  &__table {
    width: 100%;

    th {
      padding: 5px;
      text-align: left;
      font-weight: 400;
      color: #a0a0a0;
    }

    td {
      padding: 5px;
    }
  }
}
</style>
