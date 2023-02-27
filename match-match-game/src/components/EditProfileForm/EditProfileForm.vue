<script lang="ts">
import { useUserStore } from '@/stores/user.store';
import useVuelidate from '@vuelidate/core';
import { minLength, required } from '@vuelidate/validators';

export default {
  name: 'RegisterUserview',
  props: {
    cancelEdit: { type: Function, required: true },
  },
  setup() {
    const { user, updateProfile } = useUserStore();
    return {
      v$: useVuelidate(),
      displayName: user?.displayName || '',
      updateProfile,
    };
  },
  validations() {
    return {
      displayName: { required, minLengthValue: minLength(2) },
    };
  },
  methods: {
    async handleSubmit() {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) return;
      this.updateProfile({ displayName: this.displayName });
    },
  },
};
</script>

<template>
  <form class="edit-form" novalidate="true" @submit.prevent="handleSubmit">
    <div>
      <BaseInput type="text" id="displayName" label="Login" v-model="displayName" />
      <BaseErrorField :errorMessage="v$.displayName.$errors[0]?.$message" />
    </div>
    <div class="edit-form__buttons">
      <BaseButton text="Save" type="submit" />
      <BaseButton text="Cancel" type="button" :handleClick="cancelEdit" />
    </div>
  </form>
</template>

<style lang="scss">
.edit-form {
  &__buttons {
    margin-top: 10px;
    display: flex;
    justify-content: end;
    gap: 10px;
  }
}
</style>
