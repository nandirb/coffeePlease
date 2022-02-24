/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import AnimatedLottieView from 'lottie-react-native';
import lottie from '../../../assets/lottie';
import {transparent} from '../colors';

export default function Loader() {
  return (
    <View style={styles.lottieContainer}>
      <AnimatedLottieView
        source={lottie.loading}
        style={styles.lottie}
        autoPlay
      />
    </View>
  );
}

const styles = StyleSheet.create({
  lottieContainer: {
    alignItems: 'center',
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: transparent,
  },
  splashContainer: {
    flex: 1,
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
  lottie: {
    width: 50,
    height: 50,
  },
});
