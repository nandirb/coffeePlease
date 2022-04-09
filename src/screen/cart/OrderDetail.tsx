import React from 'react';
import { View } from 'react-native';
import TextView from '../../common/components/TextView';

const OrderDetail: React.FC<any> = props => {
  console.log('props', props);
  return (
    <View>
      <TextView>hi</TextView>
    </View>
  );
};
export default OrderDetail;
