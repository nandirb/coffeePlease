/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { primary, white } from '../common/colors';
import Card from '../common/components/Card';
import TextView from '../common/components/TextView';
import Product from './store/Product';
import img from '../../assets/images/index';
import { styles as StoreStyle } from './store/Store';
import { useQuery } from '@apollo/client';
import { currentUser } from './graphql/queries';
import { useApp } from '../hook';

export default function Home({ navigation }: any) {
  const { currentUser } = useApp();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TextView style={{ color: '#8A8A8E' }}>Good morning,</TextView>
        <TextView bold large>
          {currentUser?.email}
        </TextView>

        <Card style={styles.card}>
          <TextView bold color={white}>
            za neg card bnaa
          </TextView>
        </Card>
        <View style={StoreStyle.productContainer}>
          <Product
            name={'Smoothie Strawberry'}
            price={8500}
            cal={'450 cal'}
            // source={img.smoothieStraw}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: white },
  header: {
    padding: 10,
  },
  card: { height: 80, width: 200, backgroundColor: primary },
});
