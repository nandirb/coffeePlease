import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import img from '../../../assets/images';
import { grey500 } from '../colors';
import { TEmptyView } from '../types';
import TextView from './TextView';

const Empty: React.FC<any> = ({
  textStyle,
  text,
  containerStyle,
}: TEmptyView) => {
  const idx = img.findIndex(el => el.name === 'empty');

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={{ width: 100 }}>
        <Image
          source={img[idx].source}
          style={{
            width: '100%',
            height: undefined,
            aspectRatio: 1,
            borderRadius: 10,
            opacity: 0.4,
          }}
        />
      </View>
      <TextView style={[styles.text, textStyle]}>
        {text ? text : 'Сагс хоосон байна'}
      </TextView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  image: {
    height: 100,
    borderRadius: 20,
  },
  defaultIcon: {
    marginVertical: 10,
  },
  text: {
    color: grey500,
    marginTop: 10,
  },
});

export default Empty;
