/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View } from 'react-native';
import { black, white, primary } from '../colors';
import Touchable from './Touchable';
import TextView from './TextView';

const Button: React.FC<any> = ({
  text,
  onPress,
  secondary,
  block,
  style,
  backgroundColor,
}) => {
  return (
    <Touchable onPress={onPress}>
      <View
        style={[
          {
            backgroundColor: backgroundColor || primary,
            width: 36,
            height: 36,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          },
          block && { width: '100%' },
          style,
        ]}>
        <TextView style={{ color: secondary ? black : white }}>{text}</TextView>
      </View>
    </Touchable>
  );
};

export default Button;
