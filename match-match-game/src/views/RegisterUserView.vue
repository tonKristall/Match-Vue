<script lang="ts">
import { routes } from '@/router/router';

export default {
  name: 'RegisterUserview',
  data() {
    const name = '';
    const email = '';
    const password = '';
    return {
      routes,
      name,
      email,
      password,
    };
  },

  methods: {
    signUp() {
      console.log(this.name, this.email, this.password);
    },
  },
};
</script>

<template>
  <main class="container main-container">
    <h2>Create an account</h2>
    <div>
      <span>Already have an account? </span>
      <router-link :to="routes.login.path">{{ routes.login.name }}</router-link>
    </div>
    <form class="register-form">
      <BaseInput type="name" id="name" label="Name" v-model="name" />
      <BaseInput type="email" id="email" label="E-mail" v-model="email" />
      <BaseInput type="password" id="password" label="Password" v-model="password" />
      <BaseButton text="Sign Up" type="submit" :handleClick="signUp" />
    </form>
  </main>
</template>

<style scoped>
.register-form {
  margin-top: 15px;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
