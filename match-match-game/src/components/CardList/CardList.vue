<script lang="ts">
import { useGameStore } from '@/stores/game.store';

export default {
  data() {
    return {
      gameStore: useGameStore(),
      isRememberStage: false,
      openedCards: [] as number[],
      findedCards: [] as number[],
      errorCards: [] as number[],
    };
  },
  methods: {
    checkCards() {
      const [firstIndex, secondIndex] = this.openedCards;
      if (this.currentImages[firstIndex] === this.currentImages[secondIndex]) {
        this.findedCards = [...this.findedCards, ...this.openedCards];
        this.openedCards = [];
      } else {
        this.errorCards = this.openedCards;
        setTimeout(() => {
          this.openedCards = [];
          this.errorCards = [];
        }, 1000);
      }
    },
    handleClickCard(index: number) {
      if (this.openedCards.includes(index) || this.findedCards.includes(index)) return;
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
      return this.isRememberStage || this.openedCards.includes(index);
    }
  },
  computed: {
    currentImages() {
      return this.gameStore.getImagesByCategory;
    }
  }
};
</script>

<template>
  <div class="card-list">
    <div class="card" v-for="(url, index) in currentImages" :key="index"
      style="height: calc(100%/4 - 1.5%); width: calc(100%/4 - 1.5%);">
      <div :class="['card__container', { reverse: !isOpenCard(index) }]" @click="handleClickCard(index)">
        <div class="card__back"></div>
        <div class="card__front" :style="{ backgroundImage: `url(${url})` }"></div>
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
  transition: transform 0.5s;
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
</style>