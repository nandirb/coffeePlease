/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useLayoutEffect, useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {Image, StyleSheet, View} from 'react-native';
import {
  black,
  blue100,
  brown100,
  brown300,
  brown700,
  transparent,
  white,
} from '../../common/colors';
import TeamTouchable from '../../common/components/TeamTouchable';
import TextView from '../../common/components/TextView';
import {deviceHeight, deviceWidth, setNavigationHome} from '../../utils/utils';
import HeaderRight from '../../common/components/HeaderRight';

export default function Order({navigation, route}: any) {
  const [drawer, showDrawer] = useState(false);
  useLayoutEffect(() => {
    setNavigationHome({
      navigation,
      headerLeft: <></>,
      headerRight: <HeaderRight onPress={() => showDrawer(false)} isCard />,
    });
  }, [navigation, route]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextView xxlarge bold style={{color: brown700}}>
          Jack's Coffee
        </TextView>
        <TextView small italic style={{color: brown300}}>
          Wake up and smell the coffee
        </TextView>
      </View>
      <View style={styles.body}>
        <View style={styles.productContainer}>
          <View style={styles.circle}></View>
          <Image
            style={styles.image}
            source={require('../../../assets/images/coffee-iced.png')}
          />
        </View>
      </View>

      {drawer && (
        <View style={styles.drawer}>
          <TextView>sshjd</TextView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {backgroundColor: white, flex: 1, padding: 20},
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    flex: 1,
  },
  circle: {
    position: 'absolute',
    backgroundColor: brown100,
    borderRadius: deviceWidth * 0.8,
    width: deviceWidth * 0.9,
    height: deviceWidth * 0.9,
    top: deviceHeight * 0.05,
  },
  body: {
    // backgroundColor: brown300,
    flex: 4,
  },
  productContainer: {
    width: deviceWidth,
  },
  image: {
    resizeMode: 'cover',
    width: deviceWidth * 0.9,
    height: deviceWidth * 0.9,
    // backgroundColor: brown300,
  },
  drawer: {
    position: 'absolute',
    flex: 1,
    right: 0,
    width: deviceWidth * 0.8,
    height: deviceHeight,
    backgroundColor: white,
  },
});
