import { userService } from '@/services/user.service';
import type { TSendLoginUserData, TSendRegUserData, TUserData } from '@/types/user.types';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { defineStore } from 'pinia';

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
    async initUser() {
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
        const updatedUser = await userService.update(displayName);
        const { uid } = user;
        this.user = { uid, displayName };
      } catch (err) {
        this.errorLoading = 'Error register';
      }
    },

    async authUser({ email, password }: TSendLoginUserData) {
      this.isLoading = true;
      try {
        const { user } = await userService.auth(email, password);
        const { uid, displayName } = user;
        this.user = { uid, displayName };
      } catch (err) {
        console.log(err);
        this.errorLoading = 'Error authorization';
      }
    },

    async logoutUser() {
      this.isLoading = true;
      try {
        await userService.logout();
        this.user = null;
      } catch (err) {
        console.log(err);
        this.errorLoading = 'Error logout';
      }
    },
  },
});
