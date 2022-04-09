/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useLayoutEffect, useRef, useState } from 'react';
import { FlatListProps, Image, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Carousel from 'react-native-snap-carousel';
import { teal600, primary, white, green500 } from '../../common/colors';
import Card from '../../common/components/Card';
import TextView from '../../common/components/TextView';
import Product from '../store/component/Product';
import img from '../../../assets/images/index';
import { styles as StoreStyle } from '../store/component/Store';
import { deviceWidth, setNavigationHome } from '../../common/utils';
import { HeaderRight, Touchable } from '../../common/components';
import { useQuery } from '@apollo/client';
import { products } from '../store/graphql/queries';
import { useApp } from '../../hook';

export default function Home({ navigation }: any) {
  useLayoutEffect(() => {
    setNavigationHome({
      navigation,
      headerLeft: null,
      headerRight: <HeaderRight />,
    });
  }, [navigation]);

  const app = useApp();
  const reward = app.currentUser?.reward;
  const rewardIdx = img.findIndex(el => el.name === 'reward');
  const checkIdx = img.findIndex(el => el.name === 'check');
  const placeholder = img.findIndex(el => el.name === 'placeholder');

  const { data: dataProducts, loading: loadingProducts } = useQuery(products, {
    fetchPolicy: 'network-only',
  });

  const bestsellers = dataProducts?.products?.filter(
    (p: { productStatus: string }) => p.productStatus === 'bestseller',
  );

  const renderItem = ({ index, item }: any) => {
    const idx = img.findIndex(el => el.name === item?.image);
    return (
      <Product
        data={item}
        id={item?._id}
        navigation={navigation}
        name={item?.name}
        unitPrice={item?.unitPrice}
        cal={item?.cal}
        source={idx > -1 ? img[idx].source : img[placeholder].source}
      />
    );
  };

  const coupons = [
    {
      name: 'coupon1',
    },
    {
      name: 'coupon2',
    },
  ];
  const renderCoupon = ({ index, item }: any) => {
    const idx = img.findIndex(el => el.name === item?.name);
    return (
      <View
        key={index + item.source}
        style={{
          height: 150,
        }}>
        <Image
          source={idx > -1 ? img[idx].source : img[placeholder].source}
          resizeMode={'contain'}
          style={{
            width: '100%',
            height: undefined,
            aspectRatio: 2,
            backgroundColor: primary,
            borderRadius: 20,
          }}
        />
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TextView style={{ color: '#8A8A8E', marginBottom: 10 }}>
          Good morning,
        </TextView>
        <TextView bold large style={{ marginBottom: 15 }}>
          {app?.currentUser?.fullName}
        </TextView>
        {/* COUPON */}
        <Carousel
          data={coupons}
          renderItem={renderCoupon}
          itemWidth={250}
          sliderWidth={deviceWidth}
        />
        {/* <View style={{ flexDirection: 'row' }}>
          <Card style={styles.card}>
            <TextView bold xxlarge color={white}>
              2+1
            </TextView>
          </Card>
          <Card style={styles.card2}>
            <TextView bold color={white}>
              za neg card bnaa
            </TextView>
          </Card>
        </View> */}
      </View>
      {/* TANII URAMSHUULAL */}
      <View>
        <TextView bold large style={{ marginBottom: 15, padding: 10 }}>
          Таны урамшуулал
        </TextView>
        <Card>
          {[...Array(6)].map((el, i) => (
            <View
              key={'reward' + i}
              style={{
                marginHorizontal: 1,
                height: 65,
                width: 55,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                resizeMode="contain"
                style={{
                  width: '100%',
                  height: undefined,
                  aspectRatio: 1,
                  opacity: i > 2 ? 0.3 : 1,
                }}
                source={img[rewardIdx].source}
              />
              {i < reward && (
                <Image
                  style={{
                    width: 20,
                    height: 20,
                    position: 'absolute',
                    bottom: 5,
                    right: 5,
                  }}
                  source={img[checkIdx].source}
                />
              )}
              {i === 5 && (
                <TextView color={green500} bold xsmall>
                  Free
                </TextView>
              )}
            </View>
          ))}
        </Card>
      </View>

      {/* SANAL BOLGOH */}
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 10,
            padding: 10,
          }}>
          <TextView bold large>
            Санал болгох
          </TextView>
          <Touchable onPress={() => navigation.navigate('Order')}>
            <TextView bold style={{ color: primary }}>
              Бүгдийг харах
            </TextView>
          </Touchable>
        </View>
        <Carousel
          data={bestsellers}
          renderItem={renderItem}
          itemWidth={180}
          sliderWidth={deviceWidth}
        />
        {/* <View style={StoreStyle.productContainer}>
          {bestsellers?.map((p: any) => {
            const idx = img.findIndex(el => el.name === p?.image);
            return (
              <Product
                id={p?._id}
                navigation={navigation}
                name={p?.name}
                unitPrice={p?.unitPrice}
                cal={p?.cal}
                source={idx > -1 ? img[idx].source : img[placeholder].source}
              />
            );
          })}
        </View> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: white, padding: 10 },
  header: {
    padding: 10,
    marginVertical: 20,
  },
  card: {
    height: 80,
    width: 200,
    backgroundColor: primary,
    marginVertical: 10,
    marginHorizontal: 5,
  },
  card2: {
    height: 80,
    width: 200,
    backgroundColor: teal600,
    marginVertical: 10,
    marginHorizontal: 5,
  },
});
