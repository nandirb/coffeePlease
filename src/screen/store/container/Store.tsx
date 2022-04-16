import { useQuery } from '@apollo/client';
import React, { useLayoutEffect, useState } from 'react';
import { HeaderRight, Loader } from '../../../common/components';
import { setNavigationHome } from '../../../common/utils';
import Store from '../component/Store';
import { categories, products } from '../graphql/queries';
const StoreContainer: React.FC<any> = ({ navigation, route }: any) => {
  useLayoutEffect(() => {
    setNavigationHome({
      navigation,
      headerLeft: null,
      headerRight: <HeaderRight />,
    });
  }, [navigation]);

  const { data: dataCategories, loading: loadingCategories } = useQuery(
    categories,
    {
      fetchPolicy: 'network-only',
    },
  );

  const { data: dataProducts, loading: loadingProducts } = useQuery(products, {
    fetchPolicy: 'network-only',
  });

  if (loadingCategories || loadingProducts) {
    return <Loader />;
  }

  const updatedProps = {
    navigation,
    dataCategories:
      route.name === 'Order'
        ? dataCategories?.categories.filter(
            (el: { type: string }) => el.type === 'cafe',
          )
        : dataCategories?.categories.filter(
            (el: { type: string }) => el.type === 'store',
          ),
    dataProducts:
      route.name === 'Order'
        ? dataProducts?.products?.filter(
            (el: { type: string }) => el.type === 'cafe',
          )
        : dataProducts?.products?.filter(
            (el: { type: string }) => el.type === 'store',
          ),
  };
  return <Store {...updatedProps} />;
};

export default StoreContainer;
