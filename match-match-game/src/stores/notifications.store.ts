import type { TNotification } from '@/types/notification.types';
import { defineStore } from 'pinia';

type TState = {
  notifications: TNotification[];
};

const initialState: TState = {
  notifications: [],
};

export const useNotificationsStore = defineStore({
  id: 'notifications',
  state: () => initialState,

  actions: {
    addNotification(payload: TNotification) {
      this.notifications.push(payload);
    },

    removeNotification(id: string) {
      const removedIndex = this.notifications.findIndex((notification) => {
        return notification.id === id;
      });
      if (removedIndex !== -1) {
        this.notifications.splice(removedIndex, 1);
      }
    },
  },
});
