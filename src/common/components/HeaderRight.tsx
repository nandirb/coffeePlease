/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { useApp } from '../../hook';
import Touchable from './Touchable';
import IconFA from 'react-native-vector-icons/FontAwesome5';
import { primary } from '../colors';

const HeaderRight: React.FC<any> = () => {
  const navigation = useNavigation<any>();

  return (
    <Touchable
      onPress={() => navigation.navigate('Cart')}
      style={{ padding: 10 }}>
      <IconFA name={'shopping-basket'} size={16} color={primary} />
    </Touchable>
  );
};

export default HeaderRight;
