import { useQuery } from '@apollo/client';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Loader } from '../../common/components';
import TextView from '../../common/components/TextView';
import { orders } from './graphql/queries';

const MyOrders: React.FC<any> = () => {
  const { data, loading } = useQuery(orders);

  console.log('orders', data);
  if (loading) {
    <Loader />;
  }

  return (
    <SafeAreaView>
      <TextView>🔥🔥🔥 My Orders screen🔥🔥🔥</TextView>
    </SafeAreaView>
  );
};

export default MyOrders;
