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
  warn: (message: string, action?: TAction) => void;
  infinity: (message: string, action?: TAction) => void;
  isShowing: (message: string, action?: TAction) => boolean;
}

export interface IUser {
  _id: string;
  createdAt?: Date;
  phoneNumber?: string;
  email?: string;
  password?: string;
  resetPassword?: string;
  resetPasswordExpires?: number;
  avatar?: string;
  point?: number;
  reward?: number;
  fullName?: string;
  address?: string;
  deviceTokens?: string[];
  orders?: any[];
}

export interface IApplication {
  currentUser: IUser;
  updateUser: () => void;

  cartItemCont: number;
  cartProducts: () => any;
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
