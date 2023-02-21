<script lang="ts">
import { useGameStore } from './stores/game.store';
import { useUserStore } from './stores/user.store';

export default {
  name: 'App',
  data() {
    const { initUser } = useUserStore();
    return {
      initUser,
    };
  },
  async beforeMount() {
    await this.initUser();
  },
  mounted() {
    useGameStore().fetchImages();
  },
  components: {
    Header: () => import('@/components/Header/Header.vue'),
    NotificationsList: () => import('@/components/Notifications/NotificationsList.vue'),
  },
};
</script>

<template>
  <div id="app">
    <Header />
    <router-view />
    <NotificationsList />
  </div>
</template>

<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
