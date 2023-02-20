<script lang="ts">
import { routes } from '@/router/router';
import { useUserStore } from '@/stores/user.store';
import BaseButton from '@/ui/BaseButton.vue';
import { storeToRefs } from 'pinia';

export default {
  name: "Header",
  data() {
    const storeUser = useUserStore();
    const { logoutUser } = storeUser;
    const { user } = storeToRefs(storeUser);
    return {
      routes,
      storeUser,
      user,
      logoutUser,
    };
  },
  components: { BaseButton }
};
</script>

<template>
  <header class="header">
    <div class="container header__container">
      <div class="logo">
        <h1 class="h1">Match-Match</h1>
      </div>
      <nav class="navigation">
        <router-link :to=routes.home.path>{{ routes.home.name }}</router-link>
        <router-link :to=routes.score.path>{{ routes.score.name }}</router-link>
      </nav>

      <router-link v-if="!user" :to=routes.login.path>{{ routes.login.name }}</router-link>
      <BaseButton v-else class="button-header" type="button" text="Logout" :handleClick="logoutUser" />
    </div>
  </header>
</template>

<style scoped>
header {
  box-shadow: 0px 4px 4px rgb(0 0 0 / 24%);
}

.header__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navigation {
  flex-grow: 1;
  text-align: center;
}

a.router-link-exact-active {
  color: var(--color-text);
  cursor: default;
}

a.router-link-exact-active:hover {
  background-color: transparent;
}

a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

a:first-of-type {
  border: 0;
}

.button-header {
  padding: 0 1rem;
  background: none;
  font-size: inherit;
  line-height: 24px;
}

.button-header:hover {
  border-radius: 0;
  background-color: hsla(160, 100%, 37%, 0.2);
}
</style>