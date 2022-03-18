/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  blue100,
  brown100,
  brown300,
  brown700,
  transparent,
  white,
} from '../../common/colors';
import TeamTouchable from '../../common/components/TeamTouchable';
import TextView from '../../common/components/TextView';
import {deviceWidth} from '../../utils/utils';
import Product from './Product';

export default function Store({navigation}: any) {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TextView xxlarge bold style={{color: brown700}}>
            Jack's Coffee
          </TextView>
          <TextView small italic style={{color: brown300}}>
            Wake up and smell the coffee
          </TextView>
        </View>
        <View style={styles.productContainer}>
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: white},
  header: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: deviceWidth,
  },
  productContainer: {
    overflow: 'hidden',
    padding: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },

  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
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
