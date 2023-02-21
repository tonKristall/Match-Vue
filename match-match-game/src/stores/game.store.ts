import { defineStore } from 'pinia';
import { gameService } from '@/services/game.service';
import { shuffleArray } from '@/helpers/shuffleArray';
import type { TImage } from '@/types/game.types';
import { useNotificationsStore } from './notifications.store';
import { getRandomId } from '@/helpers/getRandomId';
import type { TNotification } from '@/types/notification.types';
import { getErrorMessage } from '@/helpers/getErrorMessage';

type TState = {
  isLoading: boolean;
  difficulty: number;
  category: string;
  images: TImage[];
  isStartGame: boolean;
  lastTime: string;
};

const initialState: TState = {
  isLoading: false,
  difficulty: 4,
  category: '',
  images: [],
  isStartGame: false,
  lastTime: '',
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
    setStartGame(payload: boolean) {
      this.isStartGame = payload;
    },
    setLastTime(payload: string) {
      this.lastTime = payload;
    },
  },
});

export type TGameStore = ReturnType<typeof useGameStore>;
