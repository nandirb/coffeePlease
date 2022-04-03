/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { teal600, primary, white } from '../../common/colors';
import Card from '../../common/components/Card';
import TextView from '../../common/components/TextView';
import Product from '../store/component/Product';
import img from '../../../assets/images/index';
import { styles as StoreStyle } from '../store/component/Store';
import { useApp } from '../../hook';
import { setNavigationHome } from '../../common/utils';
import { HeaderRight } from '../../common/components';
import { useQuery } from '@apollo/client';
import { userDetail } from '../about/graphql/queries';

export default function Home({ navigation }: any) {
  useLayoutEffect(() => {
    setNavigationHome({
      navigation,
      headerLeft: null,
      headerRight: <HeaderRight />,
    });
  }, [navigation]);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TextView style={{ color: '#8A8A8E' }}>Good morning,</TextView>
        <TextView bold large style={{ marginBottom: 10 }}>
          {}
        </TextView>
        <View style={{ flexDirection: 'row' }}>
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
        </View>
      </View>
      <View style={StoreStyle.productContainer}>
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
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: white },
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
