/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import img from '../../../assets/images';
import { primary, grey400, white } from '../../common/colors';
import { Button, Card } from '../../common/components';
import TextView from '../../common/components/TextView';
import { isIphoneWithNotch } from '../../common/utils';
import { useApp } from '../../hook';

const CartItem = ({
  item,
  totalPrice,
  setTotalPrice,
  handleRemoveItem,
}: any) => {
  const app = useApp();
  const placeholder = img.findIndex(el => el.name === 'placeholder');
  const product = item?.product;
  const idx = img.findIndex(el => el.name === product.image);

  const [count, setItemCount] = useState(item?.count);
  const [itemTotal, setItemTotal] = useState(product?.unitPrice * count);

  const updataTotal = (itemTotal: number, type: string) => {
    if (type === '+') {
      setTotalPrice(totalPrice + itemTotal);
    }
    if (type === '-') {
      setTotalPrice(totalPrice - itemTotal);
    }
  };

  return (
    <View key={product._id + 'cart' + product.unitPrice}>
      <Card style={styles.card}>
        <View style={{ width: 70, height: 70 }}>
          <Image
            style={styles.image}
            source={idx > -1 ? img[idx].source : img[placeholder].source}
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    paddingHorizontal: 10,
  },

  card: { height: 100, padding: 5 },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    borderRadius: 10,
  },
});

export default CartItem;
