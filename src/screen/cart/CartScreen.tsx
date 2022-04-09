/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import img from '../../../assets/images';
import { grey400, primary, white } from '../../common/colors';
import { BottomModal, Button, Card, Empty } from '../../common/components';
import Divider from '../../common/components/Divider';
import TextView from '../../common/components/TextView';
import { isIphoneWithNotch } from '../../common/utils';
import { useApp } from '../../hook';

const Cart: React.FC<any> = props => {
  const { navigation } = props;
  const app = useApp();
  const [items, setItems] = useState(app.cartProducts);
  const [totalPrice, setTotalPrice] = useState(app.cartTotalPrice);
  const [paymentModal, setPaymentModal] = useState(false);

  //   status: string;
  //   deliverType: string;
  //   deliverAddress?: string;
  //   products: IProduct[];
  //   totalPrice: Number;
  //   userId: string;

  //   useEffect(()=>{
  // app.cartProducts
  //   }, [items])

  const updataTotal = (itemTotal: number, type: string) => {
    if (type === '+') {
      setTotalPrice(totalPrice + itemTotal);
    }
    if (type === '-') {
      setTotalPrice(totalPrice - itemTotal);
    }
  };

  const handleRemoveItem = (idx: any) => {
    const temp = [...items];
    temp.splice(idx, 1);
    setItems(temp);
  };

  return (
    <SafeAreaView style={styles.container}>
      {app.cartProducts.length > 0 ? (
        <>
          <ScrollView>
            {items.map((item: any, index: any) => {
              const placeholder = img.findIndex(
                el => el.name === 'placeholder',
              );
              const product = item?.product;
              const idx = img.findIndex(el => el.name === product.image);

              const [count, setItemCount] = useState(item?.count);
              const [itemTotal, setItemTotal] = useState(
                product?.unitPrice * count,
              );

              return (
                <View key={product._id + 'cart' + product.unitPrice}>
                  <Card style={styles.card}>
                    <View style={{ width: 70, height: 70 }}>
                      <Image
                        style={styles.image}
                        source={
                          idx > -1 ? img[idx].source : img[placeholder].source
                        }
                      />
                    </View>

                    {/* INFO */}
                    <View style={{ width: 170, marginLeft: 10 }}>
                      <TextView large bold>
                        {product.name}
                      </TextView>
                      <TextView>{itemTotal} ₮</TextView>
                    </View>

                    {/* BUTTON CONTROLLER */}
                    <View
                      style={{
                        width: 100,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Button
                        text="-"
                        backgroundColor={count > 1 ? primary : grey400}
                        onPress={() => {
                          if (count < 1) {
                            return;
                            // handleRemoveItem(index);
                            // app.removeItem(item);
                          } else {
                            app.updateProductCount(product, '-');
                            app.updateCartTotal();

                            setItemCount(count - 1);
                            setItemTotal(itemTotal - product.unitPrice);
                            setTotalPrice(app.cartTotalPrice);
                            updataTotal(product.unitPrice, '-');
                          }
                        }}
                      />
                      <View style={{ padding: 5, justifyContent: 'center' }}>
                        <TextView>{count}</TextView>
                      </View>

                      <Button
                        text="+"
                        backgroundColor={primary}
                        onPress={() => {
                          app.updateProductCount(product, '+');
                          app.updateCartTotal();

                          setItemCount(count + 1);
                          setItemTotal(itemTotal + product.unitPrice);
                          setTotalPrice(app.cartTotalPrice);
                          updataTotal(product.unitPrice, '+');
                        }}
                      />
                    </View>
                  </Card>
                </View>
              );
            })}
          </ScrollView>

          <View style={styles.buttonCont}>
            <Divider />
            {/* TOTAL PRICE */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
                marginVertical: 10,
              }}>
              <TextView>Нийт</TextView>
              <TextView bold large>
                {totalPrice} ₮
              </TextView>
            </View>

            <Button
              block
              text="Төлбөр төлөх"
              style={{ height: 50 }}
              onPress={() => setPaymentModal(true)}
            />
          </View>
        </>
      ) : (
        <Empty />
      )}
      {paymentModal && (
        <BottomModal>
          <TextView>ss</TextView>
        </BottomModal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    paddingHorizontal: 10,
  },
  buttonCont: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '100%',
    paddingHorizontal: 5,
    paddingBottom: isIphoneWithNotch() ? 30 : 20,
  },
  card: { height: 100, padding: 5 },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    borderRadius: 10,
  },
});

export default Cart;
