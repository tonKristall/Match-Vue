<script lang="ts">
import { routes } from '@/router/router';

export default {
  name: 'LoginUserview',
  data() {
    const email = '';
    const password = '';
    return {
      routes,
      email,
      password,
    };
  },

  methods: {
    signIn() {
      console.log(this.email, this.password);
    },
  },
};
</script>

<template>
  <main class="container main-container">
    <h2>Log in to your account</h2>
    <div>
      <span>Don't have an account? </span>
      <router-link :to="routes.register.path">{{ routes.register.name }}</router-link>
    </div>
    <form class="login-form" id="login-form">
      <BaseInput type="email" id="email" label="E-mail" v-model="email" />
      <BaseInput type="password" id="password" label="Password" v-model="password" />
      <BaseButton text="Sign In" type="submit" :handleClick="signIn" />
    </form>
  </main>
</template>

<style scoped>
.login-form {
  margin-top: 15px;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
