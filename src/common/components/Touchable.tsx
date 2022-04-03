import React from 'react';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';
import { TTouchable } from '../types';

const Touchable: React.ForwardRefRenderFunction<unknown, TTouchable> = ({
  activeOpacity = 0.5,
  style,
  children,
  onPress,
  onLongPress,
  touchRef,
  ...rest
}) => {
  let isCalled: boolean = false,
    timer: any;

  const HandlerOnceTap = (e: GestureResponderEvent) => {
    if (!isCalled) {
      isCalled = true;
      clearTimeout(timer);
      timer = setTimeout(() => {
        isCalled = false;
      }, 1000);
      return onPress && onPress(e);
    }
  };

  return (
    <TouchableOpacity
      ref={touchRef}
      style={style}
      onLongPress={() => onLongPress && onLongPress()}
      onPress={HandlerOnceTap}
      activeOpacity={activeOpacity}
      {...rest}>
      {children}
    </TouchableOpacity>
  );
};

export default Touchable;
