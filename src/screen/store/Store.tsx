/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {white} from '../../common/colors';
import Product from './Product';
import img from '../../../assets/images/index';

export default function Store({navigation}: any) {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.productContainer}>
          <Product
            name={'Dark bean'}
            price={45000}
            cal={'450 gr'}
            source={img.beanDark}
          />
          <Product
            name={'Medium bean'}
            price={45000}
            cal={'450 gr'}
            source={img.beanMedium}
          />
        </View>
      </ScrollView>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: white},
  productContainer: {
    overflow: 'hidden',
    padding: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
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
