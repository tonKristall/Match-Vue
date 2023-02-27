<script lang="ts">
import { timeToString } from '@/helpers/timeToString';
import { useGameStore, type TGameStore } from '@/stores/game.store';
import { storeToRefs } from 'pinia';
import type { Ref } from 'vue';

type TInitComponent = {
  gameStore: TGameStore;
  isStartGame: Ref<boolean>;
  timer: NodeJS.Timer | null;
  timeGame: number | null;
};

export default {
  name: 'GameTimer',
  data(): TInitComponent {
    const gameStore = useGameStore();
    const { isStartGame } = storeToRefs(gameStore);
    return {
      gameStore,
      isStartGame,
      timeGame: null,
      timer: null,
    };
  },
  methods: {
    startTimer() {
      this.timeGame = 0;
      const startTime = new Date().getTime();
      this.timer = setInterval(() => {
        const nowTime = new Date().getTime();
        this.timeGame = (nowTime - startTime) / 1000;
      }, 1000);
    },
    stopTimer() {
      if (this.timer) {
        clearInterval(this.timer);
      }
      if (this.timeGame) {
        this.gameStore.setLastScore(this.timeGame);
      }
      this.timeGame = null;
    }
  },
  computed: {
    getTime() {
      return timeToString(this.timeGame);
    }
  },
  watch: {
    isStartGame(value) {
      value ? this.startTimer() : this.stopTimer();
    }
  },
  beforeDestroy() {
    this.timeGame = null;
    this.stopTimer();
  }
};
</script>

<template>
  <div class="game-timer">{{ getTime }}</div>
</template>

<style scoped>
.game-timer {
  font-size: 21px;
}
</style>
