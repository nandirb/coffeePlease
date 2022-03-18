/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useLayoutEffect} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import colors, {
  blue100,
  brown100,
  brown300,
  brown700,
  transparent,
  white,
} from '../common/colors';
import TeamTouchable from '../common/components/TeamTouchable';
import TextView from '../common/components/TextView';
import Item from '../common/components/Item';
import {deviceWidth, setNavigationHome} from '../utils/utils';
import {SafeAreaView} from 'react-native-safe-area-context';
import HeaderLeft from '../common/components/HeaderLeft';

export default function Card({navigation, route}: any) {
  useLayoutEffect(() => {
    setNavigationHome({
      navigation,
      headerLeft: <HeaderLeft />,
      headerRight: <></>,
    });
  }, [navigation, route]);
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <TextView xxlarge bold style={{color: colors.primary}}>
            Card
          </TextView>
        </View>
        <View style={styles.productContainer}>
          <Item />
          <Item />
          <Item />
        </View>
        <View>
          <Button title="Pay" />
        </View>
      </SafeAreaView>
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
    overflow: 'hidden',
    padding: 10,
    flexDirection: 'column',
  },

  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
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
