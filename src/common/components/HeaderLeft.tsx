/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { IHeaderLeft } from '../types';
import Touchable from './Touchable';
import { View } from 'react-native';
import { primary } from '../colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextView from './TextView';
import { deviceWidth } from '../utils';

const HeaderLeft: React.FC<any> = ({
  title,
  back,
  logo,
  onBack,
  titleOnpress,
}: IHeaderLeft) => {
  const navigation = useNavigation<any>();

  return (
    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
      {back && (
        <Touchable
          style={{ paddingHorizontal: 15 }}
          onPress={() => {
            if (onBack) {
              onBack();
            } else {
              navigation.goBack();
            }
          }}>
          <Ionicons name="chevron-back" size={30} color={primary} />
        </Touchable>
      )}
      {logo && (
        <Touchable style={{ paddingHorizontal: 15 }}>
          <Ionicons
            name="ellipsis-horizontal-outline"
            size={25}
            color={primary}
          />
        </Touchable>
      )}
      <TextView
        capitalize
        bold
        xlarge
        numberOfLines={1}
        style={{ width: deviceWidth - 150 }}
        onPress={() => {
          titleOnpress && titleOnpress();
        }}>
        {title}
      </TextView>
    </View>
  );
};

export default HeaderLeft;
