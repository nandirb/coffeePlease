/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { grey600, white } from '../../common/colors';
import {
  Button,
  Empty,
  Loader,
  Modal,
  TextInput,
  TextView,
} from '../../common/components';
import Divider from '../../common/components/Divider';
import { isIphoneWithNotch } from '../../common/utils';
import { useAlert, useApp } from '../../hook';
import { addOrder } from '../Order/graphql/mutations';
import CartItem from './CartItem';
import { useMutation } from '@apollo/client';

const CartScreen: React.FC<any> = ({ navigation }) => {
  const app = useApp();
  const alert = useAlert();

  const cartProducts = app.cartProducts();

  const [items, setItems] = useState(cartProducts);
  const [totalPrice, setTotalPrice] = useState(app.cartTotalPrice);

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
    userId: app.currentUser._id,
  });

  const [stage, setStage] = useState(0);
  const [isVisible, setVisible] = useState([false, false, false, false]);
  const [orderVisible, setOrderVisible] = useState(false);

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

  const renderStages = () => {
    if (stage === 1) {
      return (
        <Modal
          isBottom
          onVisible={() => {
            setVisible([false, false, false, false]);
          }}
          isVisible={isVisible[1]}
          shadowRadius={3}>
          <View style={styles.deliverBtns}>
            <Button
              height={50}
              style={{ width: 150 }}
              onPress={() => {
                setStage(3);
                setDeliverType('cafe');
                setVisible([false, false, false, true]);
              }}
              text="Кофе шопоос авах"
            />
            <Button
              height={50}
              style={{ width: 150 }}
              onPress={() => {
                setStage(2);
                setDeliverType('deliver');
                setVisible([false, false, true, false]);
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
          isBottom
          onVisible={() => {
            setVisible([false, true, false, false]);
          }}
          style={{ height: 600 }}
          isVisible={isVisible[2]}
          shadowRadius={3}>
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
          <View
            style={{
              width: '100%',
              position: 'absolute',
              bottom: isIphoneWithNotch() ? 40 : 30,
            }}>
            <Button
              block
              height={50}
              width={100}
              onPress={() => {
                setStage(3);
                setVisible([false, true, false, true]);
              }}
              text="Захиалах"
            />
          </View>
        </Modal>
      );
    }

    if (stage === 3) {
      console.log('VAR', variables.items);
      return (
        <Modal
          onVisible={() => {
            setVisible([false, false, true, false]);
          }}
          isVisible={isVisible[3]}
          shadowRadius={3}>
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
                  <TextView>{i.product.name}</TextView>
                  <View style={{ alignItems: 'flex-end' }}>
                    <TextView>{i.product.unitPrice}</TextView>
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
                isBottom
                height={50}
                onPress={() => {
                  setVariables({
                    ...variables,
                    totalPrice,
                  });
                  setStage(0);
                  setVisible([false, false, false, false]);

                  //   alert.success('Done');
                  //   navigation.navigate('Back');
                  //app.clearCart();

                  addOrderMutation({ variables })
                    .then(res => {
                      if (res.errors) {
                        console.log('error', res.errors);
                      }
                      console.log('done');
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
    return null;
  };

  return (
    <View style={styles.container}>
      {app.cartProducts().length > 0 ? (
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
                  console.log('d');
                  setStage(1);
                  setVisible([false, true, false, false]);
                }}
              />
            </View>
          )}
        </>
      ) : (
        <Empty />
      )}
      {renderStages()}
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
});

export default CartScreen;
