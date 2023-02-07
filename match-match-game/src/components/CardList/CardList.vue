<script lang="ts">
import { defineComponent, type Ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useGameStore, type TGameStore } from '@/stores/game.store';
import { TIME_REMEMBER_STAGE } from '@/const';

type TInitialComponent = {
  gameStore: TGameStore,
  isStartGame: Ref<boolean>,
  isRememberStage: boolean,
  currentImages: string[],
  openedCards: number[],
  findedCards: number[],
};

export default defineComponent({
  name: 'CardList',
  data(): TInitialComponent {
    const gameStore = useGameStore();
    const { isStartGame } = storeToRefs(gameStore);
    return {
      gameStore,
      isStartGame,
      isRememberStage: false,
      currentImages: [],
      openedCards: [],
      findedCards: [],
    };
  },
  methods: {
    checkFinishGame() {
      if (this.findedCards.length === this.gameStore.difficulty ** 2) {
        this.currentImages = [];
        this.gameStore.setStartGame(false);
      }
    },
    checkCards() {
      const [firstIndex, secondIndex] = this.openedCards;
      if (this.currentImages[firstIndex] === this.currentImages[secondIndex]) {
        this.findedCards = [...this.findedCards, ...this.openedCards];
        this.openedCards = [];
        this.checkFinishGame();
      } else {
        setTimeout(() => {
          this.openedCards = [];
        }, 400);
      }
    },
    handleClickCard(index: number) {
      if (this.isOpenCard(index)) return;
      switch (this.openedCards.length) {
        case 0:
          this.openedCards.push(index);
          break;
        case 1:
          this.openedCards.push(index);
          this.checkCards();
          break;
      }
    },
    isOpenCard(index: number) {
      return this.isRememberStage || this.openedCards.includes(index) || this.findedCards.includes(index);
    },
    isFindedCards(index: number) {
      return this.findedCards.includes(index);
    },
    startGame() {
      this.currentImages = this.gameStore.getImagesByCategory();
      this.openedCards = [];
      this.findedCards = [];
      this.isRememberStage = true;
      setTimeout(() => {
        this.isRememberStage = false;
      }, TIME_REMEMBER_STAGE);
    },
  },
  watch: {
    isStartGame(value) {
      if (value) {
        this.startGame();
      }
    }
  }
});
</script>

<template>
  <div class="card-list">
    <div class="card" v-for="(url, index) in currentImages" :key="index"
      style="height: calc(100%/4 - 1.5%); width: calc(100%/4 - 1.5%);">
      <div :class="['card__container', { reverse: !isOpenCard(index) }]" @click="handleClickCard(index)">
        <div class="card__back"></div>
        <div :class="['card__front', { 'good-open': isFindedCards(index) }]"
          :style="{ backgroundImage: `url(${url})` }"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-list {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.card {
  margin: 2px 2px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  perspective: 30rem;
}

.card__container {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.4s;
}

.card__container.reverse {
  transform: rotateY(180deg);
  cursor: pointer;
}

.card__back {
  background-image: url('../../assets/images/card-back.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  transform: rotateY(180deg);
  backface-visibility: hidden;
}

.card__front {
  background-color: yellowgreen;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  backface-visibility: hidden;
}

.card__front,
.card__back {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 5px;
}

.good-open {
  opacity: 0.5;
  transition: opacity 0.2s;
}
</style>