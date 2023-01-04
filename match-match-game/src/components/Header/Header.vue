<script setup lang="ts">
import { routes } from '@/router/router';
import { defineComponent } from "vue";
defineComponent({
  setup() {
    return { routes };
  }
});
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
      <span class="register">register new player</span>
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

.navigation a.router-link-exact-active {
  color: var(--color-text);
  cursor: default;
}

.navigation a.router-link-exact-active:hover {
  background-color: transparent;
}

.navigation a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

.navigation a:first-of-type {
  border: 0;
}
</style>