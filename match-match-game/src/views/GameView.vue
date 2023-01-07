<script lang="ts">
import { storeToRefs } from 'pinia';
import { useGameStore } from '@/stores/game.store';

export default {
  name: 'GameView',
  components: {
    CardList: () => import('@/components/CardList/CardList.vue'),
    GameTimer: () => import('@/components/GameTimer/GameTimer.vue'),
    GameStart: () => import('@/components/GameStart/GameStart.vue'),
  },
  data() {
    const gameStore = useGameStore();
    const { isStartGame } = storeToRefs(gameStore);
    const { setStartGame } = gameStore;
    return {
      setStartGame,
      isStartGame,
    };
  },
  beforeDestroy() {
    this.setStartGame(false);
  },
};
</script>

<template>
  <main class="container main-container">
    <GameStart v-if="!isStartGame" />
    <GameTimer />
    <CardList />
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
