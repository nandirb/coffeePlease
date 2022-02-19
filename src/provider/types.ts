export type TAlert = {
  isOpen: boolean;
  message?: string;
  type?: string;
  backgroundColor?: string;
  action?: TAction;
};

export type TAction = {
  onPress: () => void;
  label: string;
};

export interface IAlert {
  alert: (message: string, action?: TAction) => void;
  error: (message: string, action?: TAction) => void;
  success: (message: string, action?: TAction) => void;
  info: (message: string, action?: TAction) => void;
  infinity: (message: string, action?: TAction) => void;
  isShowing: (message: string, action?: TAction) => boolean;
}

export interface IApplication {
  updateUser: () => void;
  currentUser: any;

  getChoosenProduct: () => any;
  setChoosenProduct: (isEdit: boolean, product: any) => void;
  getAddedProduct: () => any;
  setAddedProduct: (isEdit: boolean, product: any) => void;

  notificationCounts: any;
  updateUnreadNotificationCounts: () => void;
}
