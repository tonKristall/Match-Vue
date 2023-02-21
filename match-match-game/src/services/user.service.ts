import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

export const userService = {
  async register(email: string, password: string) {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password);
  },

  async auth(email: string, password: string) {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password);
  },

  async logout() {
    const auth = getAuth();
    return signOut(auth);
  },

  async update(displayName: string) {
    const { currentUser } = getAuth();
    if (currentUser) {
      return updateProfile(currentUser, { displayName, photoURL: '25' });
    }
  },
};
