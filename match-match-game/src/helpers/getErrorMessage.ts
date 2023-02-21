import type { FirebaseError } from '@firebase/util';

const isFirebaseError = (error: unknown): error is FirebaseError => {
  return !!error && typeof error === 'object' && 'code' in error;
};

export const getErrorMessage = (error: unknown) => {
  let errorMessage = '';
  if (isFirebaseError(error) && error.code) {
    const code = error.code;
    errorMessage = code
      .replace(/(\w+)\/(\w+)/, (_: unknown, method: string, message: string) => {
        return `${method.toUpperCase()} ERROR: ${message}`;
      })
      .replace(/-/g, ' ');
  }
  return errorMessage;
};
