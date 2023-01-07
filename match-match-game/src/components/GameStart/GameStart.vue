<script lang="ts">
import { useGameStore } from '@/stores/game.store';

export default {
  name: 'GameStart',
  data() {
    const { setStartGame } = useGameStore();
    return {
      setStartGame,
    };
  },
};
</script>

<template>
  <div class="game-start">
    <button class="game-start__button green" type="button" @click="() => setStartGame(true)">start</button>
  </div>
</template>

<style scoped>
.game-start {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 15px;
  background-color: rgba(00, 00, 00, 0.5);
  z-index: 10;
}

.game-start__button {
  padding: 10px 20px;
  cursor: pointer;
  font-size: 20px;
  text-transform: capitalize;
  border-radius: 10px;
}
</style>