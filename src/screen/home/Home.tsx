/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useLayoutEffect, useRef, useState } from 'react';
import { Image, Linking, Platform, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Carousel from 'react-native-snap-carousel';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Product from '../store/component/Product';
import img from '../../../assets/images/index';
import { deviceWidth, setNavigationHome } from '../../common/utils';
import {
  Button,
  HeaderRight,
  Modal,
  Touchable,
  TextView,
  Card,
} from '../../common/components';
import { useQuery } from '@apollo/client';
import { products } from '../store/graphql/queries';
import { useApp } from '../../hook';
import { grey600, primary, white } from '../../common/colors';
import MapView, {
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
  Marker,
} from 'react-native-maps';

export default function Home({ navigation }: any) {
  useLayoutEffect(() => {
    setNavigationHome({
      navigation,
      headerLeft: null,
      headerRight: <HeaderRight />,
    });
  }, [navigation]);

  const app = useApp();
  const placeholder = img.findIndex(el => el.name === 'placeholder');

  const { data: dataProducts, loading: loadingProducts } = useQuery(products, {
    fetchPolicy: 'network-only',
  });

  const [modal, setModal] = useState(false);

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

  function openMaps() {
    if (Platform.OS === 'android') {
      Linking.openURL(
        `geo:0,0?q=${47.9045406},${106.9256958}(destination)`,
      ).catch(err => console.error('An error occurred', err));
    } else {
      Linking.openURL(
        `maps://maps.apple.com/?ll=${47.9045406},${106.9256958}&q=${'destination'}`,
      ).catch(err => console.error('An error occurred', err));
    }
  }

  //   const renderMap = () => {
  //     return (
  //       <>
  //         <MapView
  //           provider={Platform.OS === 'ios' ? PROVIDER_DEFAULT : PROVIDER_GOOGLE} // remove if not using Google Maps
  //           region={{
  //             latitude: 47.9045406,
  //             longitude: 106.9256958,
  //             latitudeDelta: 0.1015,
  //             longitudeDelta: 0.121,
  //           }}>
  //           <Marker
  //             key={Math.random()}
  //             coordinate={{
  //               latitude: 47.9045538,
  //               longitude: 106.9273132,
  //             }}
  //             onPress={() => {}}
  //           />
  //         </MapView>
  //       </>
  //     );
  //   };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TextView style={{ color: '#8A8A8E', marginBottom: 10 }}>
          Good morning,
        </TextView>
        <TextView bold large style={{ marginBottom: 15 }}>
          {app?.currentUser?.fullName}
        </TextView>
      </View>
      {/* COUPON */}
      <Carousel
        data={coupons}
        renderItem={renderCoupon}
        itemWidth={250}
        sliderWidth={deviceWidth}
      />

      <View style={{ padding: 10 }}>
        <Card
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: deviceWidth * 0.95,
            backgroundColor: primary,
          }}
          onPress={() => setModal(true)}>
          <TextView bold color={white}>
            Салбарын байршил
          </TextView>
          <Ionicons name="location-outline" size={20} color={white} />
        </Card>
      </View>

      {/* SANAL BOLGOH */}
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 10,
            padding: 20,
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
      </View>
      {modal && (
        <Modal isVisible={modal} onVisible={setModal} width={'95%'}>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              flexDirection: 'row',
              marginBottom: 30,
            }}>
            <TextView bold large>
              Coffee, Please?
            </TextView>
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 20,
            }}>
            <TextView style={{ color: grey600 }}>Цагийн хуваарь</TextView>
            <TextView bold style={{ color: grey600 }}>
              7:30AM–10PM
            </TextView>
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 20,
            }}>
            <TextView style={{ color: grey600 }}>Холбоо барих</TextView>
            <TextView bold style={{ color: grey600 }}>
              75553000
            </TextView>
          </View>
          <View style={{ width: '100%' }}>
            <Button
              icon={'location-outline'}
              icnColor={white}
              text={'Байршлуудыг харах'}
              block
              onPress={() => openMaps()}
            />
          </View>
        </Modal>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: white },
  header: { padding: 10, marginVertical: 10 },
});
