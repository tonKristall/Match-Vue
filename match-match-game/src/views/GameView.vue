<script lang="ts">
import { defineComponent } from 'vue';
import { storeToRefs } from 'pinia';
import { useGameStore } from '@/stores/game.store';

export default defineComponent({
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
});
</script>

<template>
  <main class="container main-container">
    <GameStart v-if="!isStartGame" />
    <GameTimer />
    <CardList />
  </main>
</template>
