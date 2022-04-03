import * as React from 'react';
import color from 'color';
import { StyleSheet, View } from 'react-native';
import { TDivider } from '../types';

const Divider: React.FC<any> = ({ inset, style, ...rest }: TDivider) => {
  return (
    <View {...rest} style={[styles.light, inset && styles.inset, style]} />
  );
};

const styles = StyleSheet.create({
  light: {
    backgroundColor: color('black').alpha(0.22).rgb().string(),
    height: StyleSheet.hairlineWidth,
  },
  inset: {
    marginLeft: 72,
  },
});

export default Divider;
