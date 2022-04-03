/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import images from '../../../../assets/images';
import { grey600, white } from '../../../common/colors';
import { HeaderLeft, HeaderRight } from '../../../common/components';
import Button from '../../../common/components/Button';
import ImageView from '../../../common/components/ImageView';
import TextView from '../../../common/components/TextView';
import { setNavigationHome } from '../../../common/utils';

const ProductDetail: React.FC<any> = ({ navigation }: any) => {
  useLayoutEffect(() => {
    setNavigationHome({
      navigation,
      headerLeft: <HeaderLeft back />,
      headerRight: <HeaderRight />,
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <TextView>detail</TextView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  bottom: {
    flexDirection: 'column',
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  image: {
    width: '100%',
    borderRadius: 10,
    height: 100,
    marginBottom: 5,
  },
  description: {
    width: '100%',
  },
});

export default ProductDetail;
