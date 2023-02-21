import { getErrorMessage } from '@/helpers/getErrorMessage';
import { getRandomId } from '@/helpers/getRandomId';
import { userService } from '@/services/user.service';
import type { TNotification } from '@/types/notification.types';
import type { TSendLoginUserData, TSendRegUserData, TUserData } from '@/types/user.types';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { defineStore } from 'pinia';
import { useNotificationsStore } from './notifications.store';

type TState = {
  user: TUserData | null;
  isLoading: boolean;
  errorLoading: string;
};

const initialState: TState = {
  user: null,
  isLoading: false,
  errorLoading: '',
};

export const useUserStore = defineStore({
  id: 'user',
  state: () => initialState,

  getters: {
    getUser(state) {
      return state.user;
    },
  },

  actions: {
    initUser() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const { uid, displayName } = user;
          this.user = { uid, displayName };
        } else {
          this.user = null;
        }
      });
    },

    async registerUser({ email, password, displayName }: TSendRegUserData) {
      this.isLoading = true;
      try {
        const { user } = await userService.register(email, password);
        await userService.update(displayName);
        const { uid } = user;
        this.user = { uid, displayName };
      } catch (error) {
        const { addNotification } = useNotificationsStore();
        const message = getErrorMessage(error) || 'Error registration';
        const notification: TNotification = { id: getRandomId(), type: 'error', message };
        addNotification(notification);
      }
    },

    async authUser({ email, password }: TSendLoginUserData) {
      this.isLoading = true;
      try {
        const { user } = await userService.auth(email, password);
        const { uid, displayName } = user;
        this.user = { uid, displayName };
      } catch (error) {
        const { addNotification } = useNotificationsStore();
        const message = getErrorMessage(error) || 'Error auth';
        const notification: TNotification = { id: getRandomId(), type: 'warning', message };
        addNotification(notification);
      }
    },

    async logoutUser() {
      this.isLoading = true;
      try {
        await userService.logout();
        this.user = null;
      } catch (error) {
        const { addNotification } = useNotificationsStore();
        const message = getErrorMessage(error) || 'Error logout';
        const notification: TNotification = { id: getRandomId(), type: 'error', message };
        addNotification(notification);
      }
    },
  },
});
