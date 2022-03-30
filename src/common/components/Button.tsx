/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {black, white, primary} from '../colors';
import TeamTouchable from './TeamTouchable';
import TextView from './TextView';
const Button: React.FC<any> = ({text, onPress, secondary, block}) => {
  return (
    <TeamTouchable onPress={onPress}>
      <View
        style={[
          {
            backgroundColor: primary,
            width: 36,
            height: 36,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          },
          block && {width: '100%'},
        ]}>
        <TextView style={{color: secondary ? black : white}}>{text}</TextView>
      </View>
    </TeamTouchable>
  );
};

export default Button;
