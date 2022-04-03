/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import AnimatedLottieView from 'lottie-react-native';
import lottie from '../../../assets/lottie';
import { transparent } from '../colors';

const Loader = ({ isLottie }: any) => {
  return (
    <View style={styles.container}>
      {isLottie && (
        <View style={styles.lottieContainer}>
          <AnimatedLottieView
            source={lottie.loading}
            style={styles.lottie}
            autoPlay
          />
        </View>
      )}
    </View>
  );
};

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
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    zIndex: 1000,
  },
});

export default Loader;
