/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet } from 'react-native';
import { grey700, white } from '../colors';
import Touchable from './Touchable';

const Card: React.FC<any> = ({ children, style, onPress }) => {
  return (
    <Touchable onPress={onPress} style={[styles.itemContainer, style]}>
      {children}
    </Touchable>
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
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    backgroundColor: white,
  },
});

export default Card;
