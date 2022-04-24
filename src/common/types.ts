import React, { LegacyRef, MouseEvent, RefObject, SetStateAction } from 'react';
import {
  GestureResponderEvent,
  ModalProps,
  NativeSyntheticEvent,
  StyleProp,
  TextInput,
  TextInputProps,
  TextInputSubmitEditingEventData,
  TextProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import { FastImageProps, ImageStyle } from 'react-native-fast-image';
import { RectButton } from 'react-native-gesture-handler';
import { Rect } from 'react-native-popover-view';

export type TTouchable = {
  activeOpacity?: number;
  style?: StyleProp<ViewStyle>;
  onPress?: (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | GestureResponderEvent,
  ) => void;
  onLongPress?: () => void;
  touchRef?: LegacyRef<TouchableOpacity>;
};

export type TTextView = TextProps & {
  xxsmall?: boolean;
  xsmall?: boolean;
  small?: boolean;
  large?: boolean;
  xlarge?: boolean;
  xxlarge?: boolean;
  xxxlarge?: boolean;
  xxxxlarge?: boolean;
  bold?: boolean;
  boldless?: boolean;
  italic?: boolean;
  style?: StyleProp<TextStyle>;
  capitalize?: boolean;
  uppercase?: boolean;
  flex?: boolean;
  lineHeight?: number;
  center?: boolean;
  color?: string;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  onLongPress?: ((event: GestureResponderEvent) => void) | undefined;
};

export type IImageView = {
  containerStyle?: StyleProp<ViewStyle>;
  style: ImageStyle;
  resizeMode?: FastImageProps['resizeMode'] | undefined;
  onErrorComponent?: any;
  uri?: string;
  onPress?: () => void;
  placeHolder?: string;
  onLoadEvent?: any;
  touchRef?: LegacyRef<RectButton> | undefined;
  width?: number | string | undefined;
  height?: number | string | undefined;
};

export type TEmptyView = {
  textStyle?: StyleProp<TextStyle>;
  text?: string;
  containerStyle?: StyleProp<ViewStyle>;
};

export type TMainModal = ModalProps &
  ViewProps & {
    onHide?: () => void;
    isVisible: boolean;
    onVisible: SetStateAction<any>;
    style?: StyleProp<ViewStyle>;
    cancelable: boolean;
    shadowRadius: number;
    isBottom: boolean;
    width: string;
  };

export type TAlert = {
  message?: string;
  isLottie?: boolean;
  lottieType?: 'success' | 'error' | 'info';
  isOpen: boolean;
  close: () => void;
};

export type IButton = {
  text?: string;
  onPress?:
    | (((event: GestureResponderEvent) => void) & (() => void))
    | undefined;
  textStyle?: StyleProp<TextStyle>;
  buttonColorArray?: string[];
  uppercase?: string;
  linearGradientStyle?: StyleProp<ViewStyle>;
  iconName?: string;
  iconColor?: string;
  iconSize?: number;
  isLoading?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  iconStyle?: object;
  block?: boolean | false;
  iconPosition?: string | 'left';
  gradientStart?: { x: number; y: number } | undefined;
  gradientEnd?: { x: number; y: number } | undefined;
  touchStyle?: object;
  iconSrc?: 'FontAwesome' | 'MaterialIcons' | 'SimpleLineIcons';
};

export type IHeaderLeft = {
  title?: string;
  back?: boolean;
  logo?: boolean;
  onBack?: () => void;
  titleOnpress?: () => void;
};

export type $Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
export type $RemoveChildren<T extends React.ComponentType<any>> = $Omit<
  React.ComponentPropsWithoutRef<T>,
  'children'
>;
export type TDivider = $RemoveChildren<typeof View> & {
  /**
   *  Whether divider has a left inset.
   */
  inset?: boolean;
  style?: StyleProp<ViewStyle>;
  /**
   * @optional
   */
};

export type TPopover = {
  isVisible: boolean;
  onVisible: SetStateAction<any>;
  from?:
    | Rect
    | RefObject<View>
    | ((sourceRef: RefObject<View>, openPopover: () => void) => React.ReactNode)
    | React.ReactNode;
  popStyle?: StyleProp<ViewStyle>;
  popBackgroundColor?: string;
  arrowStyle?: StyleProp<ViewStyle>;
  hasArrow?: boolean;
  isFixed70?: boolean;
  isFixed50?: boolean;
  onRequestClose?: () => void;
};

export type TBottomModal = {
  onHide?: () => void;
  isVisible: boolean;
  onVisible: SetStateAction<any>;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  cancelable?: boolean | true;
  withoutTouch?: boolean;
  animationType?: 'fade' | 'none' | 'slide' | undefined;
  bgColor?: string;
};

export type TInput = TextInputProps & {
  style?: StyleProp<TextStyle> | undefined;
  placeholderTextColor?: string;
  value?: string;
  onChangeText?: (value: string) => void;
  onSubmitEditing?: (
    value: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => void;
  placeholder?: string;
  error?: string;
  inputRef?: LegacyRef<TextInput>;
};

export type TCarousel = {
  isText?: boolean;
  data: [any];
};

export type TCategory = {
  _id: string;
  name: string;
  type: string;
};

export type TProduct = {
  _id: string;
  name: string;
  type: string;
  cal: string;
  description: string;
  unitPrice: number;
  createdAt: string;
  image: string;
  productStatus: string;
};
