/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import Carousel from 'react-native-snap-carousel';
import { Image, StyleSheet, TextInput, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  black,
  grey100,
  grey200,
  grey300,
  grey600,
  primary,
  white,
} from '../../../common/colors';
import img from '../../../../assets/images/index';
import TextView from '../../../common/components/TextView';
import { Button, Card, Touchable } from '../../../common/components';
import Product from './Product';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Cart from '../../cart/CartScreen';

const Store: React.FC<any> = ({
  navigation,
  dataCategories,
  dataProducts,
}: any) => {
  const [filter, setFilter] = useState<any>(false);
  const [category, setCategory] = useState<any>({});
  // const products = dataProducts;
  const products = filter
    ? dataProducts.filter(
        (p: { categoryId: any }) => p.categoryId === category._id,
      )
    : dataProducts;

  const placeholder = img.findIndex(el => el.name === 'placeholder');

  const searchInput = () => {
    return (
      <View
        style={{
          borderWidth: 1,
          borderRadius: 10,
          borderColor: grey200,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: 50,
          paddingHorizontal: 30,
          margin: 10,
        }}>
        <Ionicons name="search" size={20} color={grey600} />
        <TextInput
          placeholder={'Хайх'}
          placeholderTextColor={grey600}
          style={{
            marginLeft: 10,
            color: black,
            width: '100%',
          }}
          returnKeyType="done"
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View>
        {searchInput()}
        <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
          {dataCategories.map((cat: { _id: string; name: any }, i: any) => {
            return (
              <Touchable
                onPress={() => {
                  setCategory(cat);
                  setFilter(true);
                }}>
                <View
                  key={'cat' + i}
                  style={{
                    padding: 10,
                    margin: 2,
                    borderColor: cat.name === category.name ? primary : grey100,
                    borderWidth: 1,
                    borderRadius: 10,
                  }}>
                  <TextView
                    color={cat.name === category.name ? primary : 'black'}>
                    {cat.name}
                  </TextView>
                </View>
              </Touchable>
            );
          })}
        </View>
      </View>
      <ScrollView>
        <View style={styles.productContainer}>
          {products.map((p: any) => {
            const idx = img.findIndex(el => el.name === p?.image);
            return (
              <View key={p._id}>
                <Product
                  data={p}
                  id={p?._id}
                  navigation={navigation}
                  name={p?.name}
                  unitPrice={p?.unitPrice}
                  cal={p?.cal}
                  source={idx > -1 ? img[idx].source : img[placeholder].source}
                />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default Store;

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: white },
  productContainer: {
    overflow: 'hidden',
    padding: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statusContainer: {
    position: 'absolute',
    bottom: 30,
    right: 0,
    left: 0,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  lottie: {
    width: 300,
    height: 300,
  },
});
