<script lang="ts">
import { routes } from '@/router/router';
import { useUserStore } from '@/stores/user.store';
import GuardRoutes from '@/hoc/GuardRoutes.vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';
import BaseErrorField from '@/ui/BaseErrorField.vue';

export default {
  name: 'RegisterUserview',
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    const { registerUser } = useUserStore();
    return {
      routes,
      email: '',
      password: '',
      displayName: '',
      registerUser,
    };
  },
  validations() {
    return {
      email: { required, email },
      password: { required, minLengthValue: minLength(6), },
      displayName: { required, minLengthValue: minLength(2) }
    };
  },
  methods: {
    async signUp() {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) return;
      this.registerUser({ email: this.email, password: this.password, displayName: this.displayName });
    },
  },
  components: { GuardRoutes, BaseErrorField },
};
</script>

<template>
  <GuardRoutes>
    <main class="container main-container">
      <h2>Create an account</h2>
      <div>
        <span>Already have an account? </span>
        <router-link :to="routes.login.path">{{ routes.login.name }}</router-link>
      </div>
      <form class="register-form" novalidate="true" @submit.prevent="signUp">
        <div>
          <BaseInput type="text" id="displayName" label="Login" v-model="displayName" />
          <BaseErrorField :errorMessage="v$.displayName.$errors[0]?.$message" />
        </div>
        <div>
          <BaseInput type="email" id="email" label="E-mail" v-model="email" />
          <BaseErrorField :errorMessage="v$.email.$errors[0]?.$message" />
        </div>
        <div>
          <BaseInput type="password" id="password" label="Password" v-model="password" />
          <BaseErrorField :errorMessage="v$.password.$errors[0]?.$message" />
        </div>
        <BaseButton text="Sign Up" type="submit" />
      </form>
    </main>
  </GuardRoutes>
</template>

<style scoped>
.register-form {
  margin-top: 15px;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>
