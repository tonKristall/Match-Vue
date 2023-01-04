<script setup lang="ts">
import Header from '@/components/Header/Header.vue';
import { useGameStore } from './stores/game.store';

useGameStore().fetchImages();
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
