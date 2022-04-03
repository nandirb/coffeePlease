import { useQuery } from '@apollo/client';
import React from 'react';
import { Loader } from '../../../common/components';
import ProductDetail from '../component/ProductDetail';
import { productDetail } from '../graphql/queries';

const ProductDetailContainer: React.FC<any> = ({ navigation }: any) => {
  const { data, loading } = useQuery(productDetail, {
    fetchPolicy: 'network-only',
  });

  if (loading) {
    return <Loader />;
  }

  const updatedProps = {
    navigation,
    dataProducts: data?.productDetail,
  };
  return <ProductDetail {...updatedProps} />;
};

export default ProductDetailContainer;
