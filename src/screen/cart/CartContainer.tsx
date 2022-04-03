/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useLayoutEffect } from 'react';
import HeaderLeft from '../../common/components/HeaderLeft';
import { setNavigationHome } from '../../common/utils';
import Cart from './CartScreen';

const CartContainer: React.FC<any> = ({ navigation, route }: any) => {
  useLayoutEffect(() => {
    setNavigationHome({
      navigation,
      headerLeft: <HeaderLeft back title={'Cart'} />,
      headerRight: null,
    });
  }, [navigation]);
  return <Cart />;
};

export default CartContainer;
