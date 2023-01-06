import { defineStore } from 'pinia';
import { gameService } from '@/servises/game.servise';
import { shuffleArray } from '@/helpers/shuffleArray';
import type { TImage } from '@/types/game.types';

type TState = {
  isLoading: boolean;
  errorLoading: string;
  difficulty: number;
  category: string;
  images: TImage[];
  isStartGame: boolean;
  lastTime: string;
};

const initialState: TState = {
  isLoading: false,
  errorLoading: '',
  difficulty: 4,
  category: '',
  images: [],
  isStartGame: false,
  lastTime: '',
};

export const useGameStore = defineStore({
  id: 'images',
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
      } catch {
        this.errorLoading = 'Error loading images';
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
