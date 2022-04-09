/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import { useMutation } from '@apollo/client';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import img from '../../../../assets/images';
import images from '../../../../assets/images';
import { grey600, primary, white } from '../../../common/colors';
import { Touchable } from '../../../common/components';
import Button from '../../../common/components/Button';
import TextView from '../../../common/components/TextView';
import { truncate } from '../../../common/utils';
import { useApp } from '../../../hook';
import { addCart } from '../../cart/graphql/mutations';

const Product: React.FC<any> = ({ data, name, unitPrice, source, cal, id }) => {
  const idx = img.findIndex(el => el.name === 'placeholder');
  const app = useApp();

  return (
    <View style={styles.container}>
      <Touchable onPress={() => console.log('yr n modal l haruuly')}>
        <Image style={styles.image} source={source || img[idx].source} />
      </Touchable>

      <View style={styles.bottom}>
        <View style={styles.description}>
          <TextView bold>{truncate(name)}</TextView>
          <TextView style={{ color: grey600 }}>{cal}</TextView>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{ width: 100 }}>
            <TextView bold>{unitPrice} ₮</TextView>
          </View>
          <Button
            text={'+'}
            onPress={() => {
              console.log(app.cartItemCont);
              if (app.cartItemCont > 0) {
                app.addItemCount();
              } else {
                app.addItemCount();
              }
              app.addtoCart(data);
            }}
          />
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
    height: 230,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginVertical: 10,
    shadowColor: '#171717',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
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
    height: 130,
    marginBottom: 5,
  },
  description: {
    // backgroundColor: grey600,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
});

export default Product;
