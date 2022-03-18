import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {View} from 'react-native';
import {useApp} from '../../hook';
import TextView from './TextView';
const HeaderLeft: React.FC<any> = ({onPress, isCard}) => {
  const app = useApp();
  const navigation = useNavigation<any>();
  return (
    <View >
      <TextView>Back</TextView>
    </View>
  );
};
export default HeaderLeft;
