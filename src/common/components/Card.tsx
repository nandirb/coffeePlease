/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet} from 'react-native';
import {grey700, white} from '../colors';
import TeamTouchable from './TeamTouchable';

const Card: React.FC<any> = ({children, style, onPress}) => {
  return (
    <TeamTouchable onPress={onPress} style={[styles.itemContainer, style]}>
      {children}
    </TeamTouchable>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginBottom: 10,
    shadowColor: grey700,
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: white,
  },
});

export default Card;