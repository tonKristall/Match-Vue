export type TTypeNotification = 'error' | 'success' | 'info' | 'warning';

export type TNotification = {
  id: string;
  type: TTypeNotification;
  message: string;
};
