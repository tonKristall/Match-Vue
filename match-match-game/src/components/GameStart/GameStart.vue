<script lang="ts">
import { useGameStore } from '@/stores/game.store';

export default {
  name: 'GameStart',
  components: {
    GameScore: () => import('@/components/GameScore/GameScore.vue'),
  },
  data() {
    const { startGame } = useGameStore();
    return {
      startGame,
    };
  },
};
</script>

<template>
  <div class="game-start">
    <GameScore />
    <BaseButton text="start game" :handleClick="startGame" />
  </div>
</template>

<style scoped>
.game-start {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 15px;
  background-color: rgba(00, 00, 00, 0.5);
  z-index: 10;
}
</style>
