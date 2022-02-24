import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import AnimatedLottieView from 'lottie-react-native';
import lottie from '../../assets/lottie';
import {transparent} from '../common/colors';

export default function SplashScreen({navigation}: any) {
  return (
    <View style={styles.lottieContainer}>
      <AnimatedLottieView
        source={lottie.logoAnimation}
        style={styles.lottie}
        autoPlay
      />
      <Button
        title="Go Home"
        // style={{color: colors.colorPrimary}}
        onPress={() => navigation.navigate('Main')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  lottieContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: transparent,
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
