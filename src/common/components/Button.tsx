/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View } from 'react-native';
import { black, white, primary } from '../colors';
import Touchable from './Touchable';
import TextView from './TextView';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Button: React.FC<any> = ({
  text,
  icon,
  icnColor,
  onPress,
  secondary,
  block,
  style,
  width,
  height,
  backgroundColor,
}) => {
  return (
    <Touchable onPress={onPress}>
      <View
        style={[
          {
            backgroundColor: backgroundColor || primary,
            width: width || 36,
            height: height || 36,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          },
          block && { width: '100%' },
          style,
        ]}>
        {icon && (
          <Ionicons
            name={icon}
            color={icnColor}
            size={20}
            style={{ marginRight: 10 }}
          />
        )}
        <TextView bold style={{ color: secondary ? primary : white }}>
          {text}
        </TextView>
      </View>
    </Touchable>
  );
};

export default Button;
