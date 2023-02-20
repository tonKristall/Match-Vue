<script lang="ts">
import GuardRoutes from '@/hoc/GuardRoutes.vue';
import { routes } from '@/router/router';
import { useUserStore } from '@/stores/user.store';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';

export default {
  name: "LoginUserview",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    const { authUser } = useUserStore();
    const email = "";
    const password = "";
    return {
      routes,
      email,
      password,
      authUser
    };
  },
  validations() {
    return {
      email: { required, email },
      password: { required }

    };
  },
  methods: {
    async signIn() {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) return;
      this.authUser({ email: this.email, password: this.password });
    },
  },
  components: { GuardRoutes }
};
</script>

<template>
  <GuardRoutes>
    <main class="container main-container">
      <h2>Log in to your account</h2>
      <div>
        <span>Don't have an account? </span>
        <router-link :to="routes.register.path">{{ routes.register.name }}</router-link>
      </div>
      <form class="login-form" novalidate="true" @submit.prevent="signIn">
        <div>
          <BaseInput type="email" id="email" label="E-mail" v-model="email" />
          <BaseErrorField :errorMessage="v$.email.$errors[0]?.$message" />
        </div>
        <div>
          <BaseInput type="password" id="password" label="Password" v-model="password" />
          <BaseErrorField :errorMessage="v$.password.$errors[0]?.$message" />
        </div>
        <BaseButton text="Sign In" type="submit" />
      </form>
    </main>
  </GuardRoutes>
</template>

<style scoped>
.login-form {
  margin-top: 15px;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>
