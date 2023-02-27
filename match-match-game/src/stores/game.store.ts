import { defineStore } from 'pinia';
import { gameService } from '@/services/game.service';
import { shuffleArray } from '@/helpers/shuffleArray';
import type { TImage } from '@/types/game.types';
import { useNotificationsStore } from './notifications.store';
import { getRandomId } from '@/helpers/getRandomId';
import type { TNotification } from '@/types/notification.types';
import { getErrorMessage } from '@/helpers/getErrorMessage';
import { useUserStore } from './user.store';

type TState = {
  isLoading: boolean;
  difficulty: number;
  category: string;
  images: TImage[];
  isStartGame: boolean;
  lastScore: number | null;
  bestScore: number | null;
};

const initialState: TState = {
  isLoading: false,
  difficulty: 4,
  category: '',
  images: [],
  isStartGame: false,
  lastScore: null,
  bestScore: null,
};

export const useGameStore = defineStore({
  id: 'game',
  state: () => initialState,

  getters: {
    getImagesByCategory: (state) => {
      const images = state.images.find((item) => state.category === item.category);
      if (images) {
        const urls = images.urls.slice(0, state.difficulty ** 2 / 2);
        return () => shuffleArray([...urls, ...urls]);
      }
      return () => [];
    },
  },

  actions: {
    async fetchImages() {
      this.isLoading = true;
      try {
        const images = await gameService.getImages();
        this.images = images;
        this.category = images[0].category;
      } catch (error) {
        const { addNotification } = useNotificationsStore();
        const message = getErrorMessage(error) || 'Error loading images';
        const notification: TNotification = { id: getRandomId(), type: 'error', message };
        addNotification(notification);
      } finally {
        this.isLoading = false;
      }
    },

    startGame() {
      this.isStartGame = true;
      this.lastScore = 0;
    },

    finishGame() {
      this.isStartGame = false;
    },

    async setLastScore(payload: number | null) {
      if (payload) {
        this.lastScore = Math.floor((this.difficulty ** 2 * 1000) / payload);
        await this.postScore();
      } else {
        this.lastScore = payload;
      }
    },

    async postScore() {
      const { user } = useUserStore();
      if (!user || !this.lastScore) return;
      try {
        if (!this.bestScore) {
          const scoreData = await gameService.getScoreByUserId(user.uid);
          this.bestScore = scoreData.val();
        }
        if (!this.bestScore || this.bestScore < this.lastScore) {
          await gameService.saveScore(user.uid, this.lastScore);
          this.bestScore = this.lastScore;
        }
      } catch (error) {
        const { addNotification } = useNotificationsStore();
        const message = getErrorMessage(error) || 'Error saving score';
        const notification: TNotification = { id: getRandomId(), type: 'error', message };
        addNotification(notification);
      }
    },

    clearGameData() {
      this.lastScore = null;
      this.bestScore = null;
    },
  },
});

export type TGameStore = ReturnType<typeof useGameStore>;
