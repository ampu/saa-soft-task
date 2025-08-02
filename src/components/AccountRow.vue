<template>
  <tr class="account-row">
    <td>
      <BFormTextarea
        maxlength="50"
        rows="2"
        noResize
        v-model.lazy="labelsString"
        @blur="validateAndSave"
      />
    </td>
    <td>
      <BFormSelect
        v-model="type"
      >
        <option
          v-for="item in accountTypeItems"
          :key="item.type"
          :value="item.type"
        >
          {{ item.title }}
        </option>
      </BFormSelect>
    </td>
    <td :colspan="type === AccountTypes.LOCAL ? 1 : 2">
      <BFormInput
        class="account-row__input"
        :class="{error: errors.login}"
        type="text"
        maxlength="100"
        v-model.lazy="login"
        @blur="validateAndSave"
      />
    </td>
    <td v-if="type === AccountTypes.LOCAL">
      <div class="account-row__password-container">
        <BFormInput
          class="account-row__input"
          :class="{error: errors.password}"
          :type="isPasswordVisible ? `text` : `password`"
          maxlength="100"
          v-model.lazy="password"
          @blur="validateAndSave"
        />
        <button
          class="account-row__password-visibility"
          type="button"
          @click="isPasswordVisible = !isPasswordVisible"
        >
          <IMdiEyeOutline v-if="isPasswordVisible"/>
          <IMdiEyeOffOutline v-if="!isPasswordVisible"/>
        </button>
      </div>
    </td>
    <td>
      <button
        class="account-row__remove-button"
        type="button"
        @click="emit(`remove`)"
      >
        <IMdiTrashCanOutline/>
      </button>
    </td>
  </tr>
</template>

<script setup lang="ts">
import {reactive, ref, watch} from 'vue'
import {type Account, AccountTypes, ACCOUNT_TYPES, ACCOUNT_TYPE_TO_INFO, parseLabels, stringifyLabels} from '../utils/account-utils'

const props = defineProps<{
  account: Account,
}>()

const emit = defineEmits<{
  (e: 'save', value: Account): void
  (e: `remove`): void
}>()

const accountTypeItems = ACCOUNT_TYPES.map((accountType) => {
  return {
    type: accountType,
    title: ACCOUNT_TYPE_TO_INFO[accountType]?.title,
  }
})

const labelsString = ref(stringifyLabels(props.account.labels))
const type = ref(props.account.type)
const login = ref(props.account.login)
const password = ref(props.account.password)

const isPasswordVisible = ref(false)

const errors = reactive({
  login: false,
  password: false,
})

const validate = () => {
  errors.login = false
  if (!login.value) {
    errors.login = true
  }

  errors.password = false
  if (type.value === AccountTypes.LOCAL) {
    if (!password.value) {
      errors.password = true
    }
  }
}

const save = () => {
  emit('save', {
    id: props.account.id,
    labels: parseLabels(labelsString.value),
    type: type.value,
    login: login.value,
    password: password.value,
  })
}

const validateAndSave = () => {
  validate()
  if (!Object.values(errors).some(Boolean)) {
    save()
  }
}

watch(type, () => {
  switch (type.value) {
    case AccountTypes.LOCAL:
      password.value = ``
      break
    case AccountTypes.LDAP:
      password.value = null
      break
  }
  validateAndSave()
})
</script>

<style lang="scss">
.account-row {
  &__input {
    &.error {
      border: 1px solid red;
    }
  }

  &__password-container {
    position: relative;
  }

  &__password-visibility {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    border: none;
    background: none;
    border-radius: 100px;
  }

  &__remove-button {
    border: none;
    background: none;
  }
}
</style>
