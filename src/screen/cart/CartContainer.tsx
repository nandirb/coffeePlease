/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from '@apollo/client';
import React, { useLayoutEffect } from 'react';
import { Loader } from '../../common/components';
import HeaderLeft from '../../common/components/HeaderLeft';
import { setNavigationHome } from '../../common/utils';
import { products } from '../store/graphql/queries';
import Cart from './CartScreen';
import { carts } from './graphql/queries';

const CartContainer: React.FC<any> = ({ navigation, route }: any) => {
  useLayoutEffect(() => {
    setNavigationHome({
      navigation,
      headerLeft: <HeaderLeft back title={'Cart'} />,
      headerRight: null,
    });
  }, [navigation]);

  const { data, loading } = useQuery(carts, {
    fetchPolicy: 'network-only',
  });

  const { data: dataProducts, loading: loadingProducts } = useQuery(products, {
    fetchPolicy: 'network-only',
  });

  if (loading) {
    return <Loader />;
  }

  const updatedProps = {
    navigation,
    // dataCarts: data?.carts,
    // dataProducts: dataProducts?.products,
  };

  return <Cart {...updatedProps} />;
};

export default CartContainer;
