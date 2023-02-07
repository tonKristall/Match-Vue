<script lang="ts">
import { useGameStore } from '@/stores/game.store';

export default {
  name: 'GameScore',

  data() {
    const store = useGameStore();
    const saveResult = () => {
      console.log('save');
    };
    return {
      store,
      saveResult,
    };
  }
};
</script>

<template>
  <div v-if="store.lastTime" class="game-result">
    <div class="game-result__text">Your time is {{ store.lastTime }} </div>
    <BaseButton text="Save Result" :handleClick="saveResult" />
  </div>
</template>

<style scoped>
.game-result {
  margin-bottom: 15px;
  text-align: center;
}

.game-result__text {
  margin-bottom: 10px;
  font-size: 20px;
  color: #ffffff;
}
</style>