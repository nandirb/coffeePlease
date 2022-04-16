/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from '@apollo/client';
import React, { useLayoutEffect } from 'react';
import { Loader } from '../../common/components';
import HeaderLeft from '../../common/components/HeaderLeft';
import { setNavigationHome } from '../../common/utils';
import { products } from '../store/graphql/queries';
import CartScreen from './CartScreen';
import { carts } from './graphql/queries';

const CartContainer: React.FC<any> = ({ navigation, route }: any) => {
  useLayoutEffect(() => {
    setNavigationHome({
      navigation,
      headerLeft: <HeaderLeft back />,
      headerRight: null,
    });
  }, [navigation]);

  const updatedProps = {
    navigation,
    // dataCarts: data?.carts,
    // dataProducts: dataProducts?.products,
  };

  return <CartScreen {...updatedProps} />;
};

export default CartContainer;
