/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {View} from 'react-native';
import {useApp} from '../../hook';
import {blue100, red600, white} from '../colors';
import TeamTouchable from './TeamTouchable';
import TextView from './TextView';

const HeaderRight: React.FC<any> = ({onPress, isCard}) => {
  const app = useApp();
  const navigation = useNavigation<any>();

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginEnd: 5,
        flexDirection: 'row',
      }}>
      <TeamTouchable
        style={{
          padding: 7,
          backgroundColor: blue100,
          borderRadius: 20,
          marginEnd: 10,
          width: 30,
          height: 30,
        }}
        onPress={onPress}>
        {/* {app.notificationCounts > 0 && ( */}
        <View
          style={{
            backgroundColor: red600,
            position: 'absolute',
            paddingHorizontal: 4,
            paddingVertical: 2,
            borderRadius: 10,
            right: 5,
            top: 5,
          }}>
          <TextView style={{color: white}} xxsmall>
            {app.notificationCounts}
          </TextView>
        </View>
        {/* )} */}
      </TeamTouchable>
      {/* {isCard && (
        <TeamTouchable
          style={{
            padding: 7,
            backgroundColor: blue100,
            borderRadius: 20,
            marginEnd: 10,
            width: 30,
            height: 30,
          }}
          onPress={() => navigation.navigate('Card')}>
          <TextView>Card</TextView>
        </TeamTouchable>
      )} */}
    </View>
  );
};

export default HeaderRight;
