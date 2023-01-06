<script lang="ts">
import { useGameStore } from './stores/game.store';

export default {
  name: 'App',
  mounted() {
    useGameStore().fetchImages();
  },
  components: {
    Header: () => import('@/components/Header/Header.vue')
  }
}

</script>

<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
