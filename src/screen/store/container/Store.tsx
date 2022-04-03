import { useQuery } from '@apollo/client';
import React from 'react';
import { Loader } from '../../../common/components';
import Store from '../component/Store';
import { categories, products } from '../graphql/queries';
const StoreContainer: React.FC<any> = ({ navigation, route }: any) => {
  console.log(route);
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
    dataProducts: dataProducts?.products,
    dataCategories: dataCategories?.categories,
  };
  return <Store {...updatedProps} />;
};

export default StoreContainer;
