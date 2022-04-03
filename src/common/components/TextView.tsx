/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text } from 'react-native';
import { TTextView } from '../types';

const TextView: React.FC<TTextView> = ({
  xxsmall,
  xsmall,
  small,
  large,
  xlarge,
  xxlarge,
  xxxlarge,
  xxxxlarge,
  bold,
  boldless,
  italic,
  children,
  style,
  capitalize,
  flex,
  lineHeight,
  center,
  color,
  onPress,
  onLongPress,
  ...rest
}) => {
  return (
    <Text
      style={[
        flex && { flex: 1 },
        xxsmall && { fontSize: 8 },
        xsmall && { fontSize: 10 },
        small && { fontSize: 12 },
        large && { fontSize: 16 },
        xlarge && { fontSize: 18 },
        xxlarge && { fontSize: 20 },
        xxxlarge && { fontSize: 25 },
        xxxxlarge && { fontSize: 30 },
        bold && { fontWeight: 'bold' },
        boldless && { fontWeight: '600' },
        italic && { fontStyle: 'italic' },
        capitalize && { textTransform: 'capitalize' },
        center && { textAlign: 'center' },
        { color },
        { lineHeight },
        style,
        // {fontFamily: 'regular'},
      ]}
      onPress={onPress}
      onLongPress={onLongPress}
      maxFontSizeMultiplier={1}
      ellipsizeMode="tail"
      {...rest}>
      {children}
    </Text>
  );
};

export default TextView;
