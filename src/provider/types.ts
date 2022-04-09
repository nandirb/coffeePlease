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
  currentUser: any;
  updateUser: () => void;

  cartItemCont: number;
  cartProducts: any[];
  cartTotalPrice: number;
  addItemCount: () => void;
  updateProductCount: (p: any, type: string) => void;
  removeItem: (p: any) => void;
  addtoCart: (p: any) => void;
  clearCart: () => void;
  updateCartTotal: () => void;

  notificationCounts: any;
  updateUnreadNotificationCounts: () => void;
}
