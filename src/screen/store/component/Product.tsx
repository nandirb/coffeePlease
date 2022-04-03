/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import images from '../../../../assets/images';
import { grey600, white } from '../../../common/colors';
import { Touchable } from '../../../common/components';
import Button from '../../../common/components/Button';
import ImageView from '../../../common/components/ImageView';
import TextView from '../../../common/components/TextView';

const Product: React.FC<any> = ({ navigation, name, price, source, cal }) => {
  return (
    <View style={styles.container}>
      <Touchable onPress={() => navigation.navigate('ProductDetail')}>
        <Image style={styles.image} source={source} />
      </Touchable>

      <View style={styles.bottom}>
        <View style={styles.description}>
          <TextView bold>{name}</TextView>
          <TextView style={{ color: grey600 }}>{cal}</TextView>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{ width: 100 }}>
            <TextView bold>{price} ₮</TextView>
          </View>
          <Button text={'+'} onPress={() => console.log(name, 'added')} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: 160,
    height: 200,
    marginVertical: 10,
    shadowColor: '#171717',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: white,
    borderRadius: 10,
  },
  bottom: {
    flexDirection: 'column',
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  image: {
    width: '100%',
    borderRadius: 10,
    height: 100,
    marginBottom: 5,
  },
  description: {
    width: '100%',
  },
});

export default Product;
