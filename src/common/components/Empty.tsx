import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TEmptyView } from '../types';

const Empty: React.FC<any> = ({
  textStyle,
  text,
  containerStyle,
}: TEmptyView) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text maxFontSizeMultiplier={1} style={[styles.text, textStyle]}>
        {text ? text : 'There is no data'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    flex: 1,
  },
  image: {
    height: 100,
    borderRadius: 20,
  },
  defaultIcon: {
    marginVertical: 10,
  },
  text: {
    color: 'black',
    marginTop: 10,
  },
});

export default Empty;
