/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Linking, PermissionsAndroid, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { grey600, white } from '../../common/colors';
import {
  Button,
  Empty,
  Loader,
  TextInput,
  TextView,
  Modal,
} from '../../common/components';
import Divider from '../../common/components/Divider';
import { generateRandomKey, isIphoneWithNotch } from '../../common/utils';
import { useAlert, useApp } from '../../hook';
import { addOrder } from '../Order/graphql/mutations';
import CartItem from './CartItem';
import { useMutation } from '@apollo/client';
import { Colors, ScreenUtils } from 'react-native-erxes-ui';
import QRCode from 'react-native-qrcode-svg';
import Geolocation from '@react-native-community/geolocation';

const CartScreen: React.FC<any> = ({ navigation }) => {
  const app = useApp();
  const alert = useAlert();

  const cartProducts = app?.cartProducts();

  const [clicked, onClicked] = useState(false);
  const [items, setItems] = useState(cartProducts);
  const [totalPrice, setTotalPrice] = useState(app?.cartTotalPrice);
  const [deliverType, setDeliverType] = useState('cafe');
  const [deliverAddress, setDeliverAddress] = useState({
    address: '',
    lng: 0.0,
    lat: 0.0,
    phone: app?.currentUser?.phoneNumber || '',
  });
  const [variables, setVariables] = useState({
    deliverType,
    totalPrice,
    deliverAddress,
    items,
    userId: app?.currentUser._id,
  });
  const [doneVisible, setDoneVisible] = React.useState(false);
  const [locationStatus, setLocationStatus] = useState('');

  React.useEffect(() => {
    const requestLocationPermission = async () => {
      if (ScreenUtils.isIOS) {
        getOneTimeLocation();
        subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, [clicked]);

  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setVariables({
          ...variables,
          deliverAddress: {
            ...variables.deliverAddress,
            lng: Number(JSON.stringify(position.coords.longitude)),
            lat: Number(JSON.stringify(position.coords.latitude)),
          },
        });
        console.log(variables);
      },
      error => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  const subscribeLocationLocation = () => {
    console.log('here');
    watchID = Geolocation.watchPosition(
      position => {
        setVariables({
          ...variables,
          deliverAddress: {
            ...variables.deliverAddress,
            lng: Number(JSON.stringify(position.coords.longitude)),
            lat: Number(JSON.stringify(position.coords.latitude)),
          },
        });
        console.log(variables);
      },
      error => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000,
      },
    );
  };

  let orderId: string | undefined;
  const [stage, setStage] = useState(0);
  const [isVisible, setVisible] = useState([false, false, false, false, false]);
  const [orderVisible, setOrderVisible] = useState(false);

  const renderStages = () => {
    if (stage === 1) {
      return (
        <Modal
          bottom
          style={styles.bottomModal}
          onVisible={() => {
            setVisible([false, false, false, false, false]);
          }}
          isVisible={isVisible[1]}>
          <View style={styles.deliverBtns}>
            <Button
              height={50}
              style={{ width: 150 }}
              onPress={() => {
                setStage(3);
                setDeliverType('cafe');
                setVisible([false, false, false, true, false]);
              }}
              text="Кофе шопоос авах"
            />
            <Button
              height={50}
              style={{ width: 150 }}
              onPress={() => {
                setStage(2);
                setDeliverType('deliver');
                setVisible([false, false, true, false, false]);
              }}
              text="Хүргэлтээр авах"
            />
          </View>
        </Modal>
      );
    }

    if (stage === 2) {
      return (
        <Modal
          bottom
          onVisible={() => {
            setVisible([false, true, false, false, false]);
          }}
          style={{ height: 600, paddingTop: 10 }}
          isVisible={isVisible[2]}>
          <TextInput
            placeholder={'Хүргүүлэх хаяг'}
            value={variables.deliverAddress.address}
            setValue={(text: string) => {
              setVariables({
                ...variables,
                deliverAddress: { ...variables.deliverAddress, address: text },
              });
            }}
          />
          <TextInput
            placeholder={'Утасны дугаар'}
            value={variables.deliverAddress.phone}
            setValue={(text: string) => {
              setVariables({
                ...variables,
                deliverAddress: { ...variables.deliverAddress, phone: text },
              });
            }}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              
            <Button
              center
              style={{ marginVertical: 20, padding: 10, height: 60 }}
              width={200}
              text="Одоогийн байршил руу хүргүүлэх"
              onPress={() => {
                onClicked(true);
                getOneTimeLocation();
                Linking.openURL(
                  `maps://maps.apple.com/?ll=${
                    variables?.deliverAddress?.lat
                  },${variables?.deliverAddress?.lng}&q=${'destination'}`,
                ).catch(err => console.error('An error occurred', err));
              }}
            />
          </View>
          <View
            style={{
              width: '100%',
              position: 'absolute',
              bottom: isIphoneWithNotch() ? 40 : 30,
              alignItems: 'center',
              flexDirection: 'column',
            }}>
            <View>
              <TextView>
                Lattitude
                <TextView bold>{variables?.deliverAddress?.lat}</TextView>
              </TextView>
              <TextView style={{ marginVertical: 20 }}>
                Longitude
                <TextView bold>{variables?.deliverAddress?.lng}</TextView>
              </TextView>
            </View>

            <Button
              height={50}
              width={300}
              onPress={() => {
                setStage(3);
                setVisible([false, true, false, true, false]);
                setDeliverType('deliver');
              }}
              text="Захиалах"
            />
          </View>
        </Modal>
      );
    }

    if (stage === 3) {
      return (
        <Modal
          cancelable={false}
          style={{ padding: 15 }}
          onVisible={() => {
            setVisible([false, false, true, false, false]);
          }}
          isVisible={isVisible[3]}>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              flexDirection: 'column',
            }}>
            <TextView bold large style={{ marginBottom: 20 }}>
              Таны захиалга
            </TextView>
            {items.map((i: any) => (
              <>
                <View
                  style={[
                    styles.sb,
                    {
                      marginVertical: 10,
                    },
                  ]}>
                  <TextView>{i.product?.name}</TextView>
                  <View style={{ alignItems: 'flex-end' }}>
                    <TextView>{i.product?.unitPrice}</TextView>
                    <TextView color={grey600} small>
                      {i.count}ш
                    </TextView>
                  </View>
                </View>
                <Divider />
              </>
            ))}
            <View style={styles.sb}>
              <TextView bold>Нийт</TextView>
              <TextView bold>{totalPrice} ₮</TextView>
            </View>
            <View style={{ width: '100%' }}>
              <Button
                block
                height={50}
                width={300}
                onPress={() => {
                  setVariables({
                    ...variables,
                    totalPrice,
                  });
                  setStage(4);
                  setVisible([false, false, false, false, true]);
                  setDoneVisible(true);
                  addOrderMutation({ variables })
                    .then(res => {
                      if (res.errors) {
                        console.log('error', res.errors);
                      }
                      orderId = res?.data?.addOrder?._id;
                    })
                    .catch(e => console.log(e.message));
                }}
                text="Захиалах"
              />
            </View>
          </View>
        </Modal>
      );
    }

    if (stage === 4) {
      const value = generateRandomKey();
      return (
        <Modal
          isVisible={doneVisible}
          onVisible={setDoneVisible}
          cancelable={false}
          style={{
            padding: 15,
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <TextView xxlarge bold>
            Захиалга амжилттай
          </TextView>
          <TextView color={Colors.grey600} style={{ marginBottom: 20 }}>
            Захиалгын дугаар: <TextView bold>{value}</TextView>
          </TextView>

          <QRCode value={orderId} />

          <Button
            onPress={() => {
              setDoneVisible(false);
              setTimeout(() => {
                alert.success('Захиалга амжилттай');
                navigation.navigate('Back');
                app?.clearCart();
              }, 1500);
            }}
            style={{ marginTop: 20, width: 300 }}
            center
            height={45}
            width={300}
            text={'OK'}
          />
        </Modal>
      );
    }
    return null;
  };

  useEffect(() => {
    if (stage === 0) {
      return;
    }
    renderStages();
  }, [stage]);

  const [addOrderMutation, { loading }] = useMutation(addOrder);

  if (loading) {
    return <Loader />;
  }

  const handleRemoveItem = (idx: any) => {
    const temp = [...items];
    temp.splice(idx, 1);
    setItems(temp);
  };

  return (
    <View style={styles.container}>
      {app?.cartProducts().length > 0 ? (
        <>
          <ScrollView style={{ padding: 10 }}>
            {items.map((item: any, index: any) => (
              <View key={index + 'i'}>
                <CartItem
                  item={item}
                  totalPrice={totalPrice}
                  setTotalPrice={setTotalPrice}
                  handleRemoveItem={handleRemoveItem}
                />
              </View>
            ))}
          </ScrollView>

          {isVisible[3] === false && (
            <View style={styles.buttonCont}>
              <Divider />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 20,
                }}>
                <TextView>Нийт</TextView>
                <TextView bold large>
                  {totalPrice} ₮
                </TextView>
              </View>

              <Button
                block
                text="Дараах"
                style={{ height: 50 }}
                onPress={() => {
                  setStage(1);
                  setVisible([false, true, false, false, false]);
                }}
              />
            </View>
          )}
        </>
      ) : (
        <Empty />
      )}
      {renderStages && renderStages()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  buttonCont: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '100%',
    paddingHorizontal: 10,
    paddingBottom: isIphoneWithNotch() ? 30 : 20,
  },
  deliverBtns: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sb: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  bottomModal: {
    height: 120,
    padding: 18,
  },
});

export default CartScreen;
