/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import colors, {white} from '../common/colors';
import TextView from '../common/components/TextView';
import {deviceWidth} from '../utils/utils';

export default function Home({navigation}: any) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextView xxlarge bold style={{color: colors.primaryDark}}>
          Jack's Coffee
        </TextView>
        <TextView small italic style={{color: colors.primaryLight}}>
          Wake up and smell the coffee
        </TextView>
      </View>
      <Image
        style={styles.image}
        source={require('../../assets/images/about1.jpeg')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: white},
  header: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: deviceWidth,
  },
  productContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    overflow: 'hidden',
    padding: 10,
  },
  image: {
    resizeMode: 'cover',
    width: deviceWidth,
    height: 100,
  },
  statusContainer: {
    position: 'absolute',
    bottom: 30,
    right: 0,
    left: 0,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  lottie: {
    width: 300,
    height: 300,
  },
});
