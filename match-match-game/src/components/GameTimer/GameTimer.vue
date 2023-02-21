<script lang="ts">
import { useGameStore, type TGameStore } from '@/stores/game.store';
import { storeToRefs } from 'pinia';
import { defineComponent, type Ref } from 'vue';

type TInitComponent = {
  gameStore: TGameStore;
  isStartGame: Ref<boolean>;
  timer: NodeJS.Timer | null;
  timeGame: string | null;
};

export default defineComponent({
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
      this.timeGame = '00:00';
      const startTime = new Date().getTime();
      this.timer = setInterval(() => {
        const nowTime = new Date().getTime();
        const time = (nowTime - startTime) / 1000;
        const seconds = Math.round(time % 60);
        const minutes = Math.round((time - seconds) / 60);
        const secondsStr = `${seconds}`.length < 2 ? `0${seconds}` : `${seconds}`;
        const minutesStr = `${minutes}`.length < 2 ? `0${minutes}` : `${minutes}`;
        this.timeGame = `${minutesStr}:${secondsStr}`;
      }, 1000);
    },
    stopTimer() {
      if (this.timer) {
        clearInterval(this.timer);
      }
      if (this.timeGame) {
        this.gameStore.setLastTime(this.timeGame);
      }
      this.timeGame = null;
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
});
</script>

<template>
  <div class="game-timer">{{ timeGame }}</div>
</template>

<style scoped>
.game-timer {
  font-size: 21px;
}
</style>
