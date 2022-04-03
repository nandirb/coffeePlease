/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { grey600, white } from '../../../common/colors';
import img from '../../../../assets/images/index';
import TextView from '../../../common/components/TextView';
import { Button, Card } from '../../../common/components';
import Product from './Product';

const Store: React.FC<any> = ({
  navigation,
  dataCategories,
  dataProducts,
}: any) => {
  console.log(dataCategories);
  const renderCategories = () => {
    dataCategories.map((cat: any) => <TextView>{cat.name}</TextView>);
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.productContainer}>
          <Product
            navigation={navigation}
            name={'Medium bean'}
            price={45000}
            cal={'450 gr'}
            source={img.beanMedium}
          />
          <Product
            navigation={navigation}
            name={'Medium bean'}
            price={45000}
            cal={'450 gr'}
            source={img.beanMedium}
          />
          <Product
            navigation={navigation}
            name={'Medium bean'}
            price={45000}
            cal={'450 gr'}
            source={img.beanMedium}
          />
          <Product
            navigation={navigation}
            name={'Medium bean'}
            price={45000}
            cal={'450 gr'}
            source={img.beanMedium}
          />
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
