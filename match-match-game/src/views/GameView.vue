<script lang="ts">
import { useGameStore } from '@/stores/game.store';

export default {
  name: 'GameView',
  data() {
    return {
      gameStore: useGameStore(),
    };
  },
  computed: {
    isShowStartButton() {
      return this.gameStore.isStartGame === false;
    }
  },
  components: {
    CardList: () => import('@/components/CardList/CardList.vue'),
    GameTimer: () => import('@/components/GameTimer/GameTimer.vue'),
    GameStart: () => import('@/components/GameStart/GameStart.vue'),
  },
};
</script>

<template>
  <main class="container main-container">
    <GameTimer />
    <CardList />
    <GameStart v-if="isShowStartButton" />
  </main>
</template>

<style scoped>
.main-container {
  margin-top: 70px;
  padding: 2rem;
  width: 1100px;
  height: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background-color: #f1f1f1;
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(0, 55, 35, 0.5);
}
</style>
