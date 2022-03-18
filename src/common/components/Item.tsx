/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import colors, {
  brown200,
  brown600,
  brown900,
  grey200,
  grey400,
  red100,
  white,
} from '../colors';
import TeamTouchable from './TeamTouchable';
import TextView from './TextView';

const Item: React.FC<any> = () => {
  return (
    <View style={styles.itemContainer}>
      <TextView xxsmall>item</TextView>
      <TextView style={styles.size}> L </TextView>
      <TextView bold style={styles.qty}>
        4
      </TextView>

      <TeamTouchable style={styles.add} onPress={() => console.log('remove')}>
        <TextView style={{color: grey400}}> + </TextView>
      </TeamTouchable>
      <TeamTouchable style={styles.sub} onPress={() => console.log('remove')}>
        <TextView style={{color: grey400}}> - </TextView>
      </TeamTouchable>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    borderRadius: 10,
    borderColor: grey200,
    borderWidth: 1,
    height: 90,
    padding: 10,
    marginBottom: 10,
  },
  size: {
    position: 'absolute',
    right: 20,
    top: 5,
    color: colors.primary,
  },
  add: {
    position: 'absolute',
    right: 100,
    bottom: 10,
    width: 30,
    height: 30,
    borderRadius: 100,
    borderColor: grey400,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sub: {
    position: 'absolute',
    right: 20,
    bottom: 10,
    width: 30,
    height: 30,
    borderRadius: 100,
    borderColor: grey400,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qty: {
    position: 'absolute',
    right: 70,
    bottom: 15,
    color: colors.primary,
  },
});

export default Item;
