/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import Color from 'color';
import React, { useMemo, useState } from 'react';
import { Image, StyleSheet, View, Modal } from 'react-native';
import { Colors, ScreenUtils } from 'react-native-erxes-ui';
import img from '../../../../assets/images';
import { grey600, white } from '../../../common/colors';
import { Touchable, TextView } from '../../../common/components';
import Button from '../../../common/components/Button';
import { truncate } from '../../../common/utils';
import { useAlert, useApp } from '../../../hook';

const Product: React.FC<any> = ({ data, name, unitPrice, source, cal, id }) => {
  const idx = img.findIndex(el => el.name === 'placeholder');
  const app = useApp();
  const alert = useAlert();
  const itemInput = {
    _id: id,
    name,
    unitPrice,
    image: data.image,
  };
  const [count, setCount] = useState(0);

  const [detailVisble, onDetailVisible] = useState(false);

  return (
    <>
      <Modal
        animationType="slide"
        presentationStyle="formSheet"
        transparent={false}
        visible={detailVisble}
        onRequestClose={() => onDetailVisible(false)}>
        <Touchable
          style={{ height: 20 }}
          onPress={() => onDetailVisible(false)}
        />
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <TextView
            bold
            xxlarge
            style={{
              marginBottom: 10,
              marginTop: 50,
            }}>
            {data?.name}
          </TextView>
          <View
            style={{
              width: '100%',
              height: 400,
              justifyContent: 'center',
            }}>
            <Image
              resizeMode={'contain'}
              style={{
                width: '100%',
                height: undefined,
                aspectRatio: 1,
                borderRadius: 20,
              }}
              source={source || img[idx].source}
            />
          </View>
          <TextView style={{ marginTop: 50, color: Colors.grey600 }}>
            {data?.type === 'cafe'
              ? `Calorie:${data?.cal}`
              : `Size:${data?.cal}`}
          </TextView>
          <TextView
            small
            style={{ marginBottom: 10, color: Colors.grey600, padding: 20 }}>
            {data?.description}
          </TextView>
        </View>
        <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
          <Button
            text={'-'}
            width={100}
            onPress={() => {
              if (count < 1) {
                return;
                // handleRemoveItem(index);
                // app?.removeItem(item);
              } else {
                setCount(count - 1);
              }
            }}
          />
          <View style={{ marginHorizontal: 30, justifyContent: 'center' }}>
            <TextView>{count}</TextView>
          </View>
          <Button
            width={100}
            text={'+'}
            onPress={() => {
              setCount(count + 1);
              if (app?.cartItemCont > 0) {
                app?.addItemCount();
              } else {
                app?.addItemCount();
              }
              app?.addtoCart(itemInput);
            }}
          />
        </View>
      </Modal>
      <View style={styles.container}>
        <Touchable onPress={() => onDetailVisible(true)}>
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
                if (app?.cartItemCont > 0) {
                  app?.addItemCount();
                } else {
                  app?.addItemCount();
                }
                app?.addtoCart(itemInput);
                alert.info(`${name} сагсанд нэмэгдлээ`);
              }}
            />
          </View>
        </View>
      </View>
    </>
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
