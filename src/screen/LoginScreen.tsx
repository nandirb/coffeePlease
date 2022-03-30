import React from 'react';
import {StyleSheet, View} from 'react-native';
import {blue100, transparent} from '../common/colors';
import TeamTouchable from '../common/components/TeamTouchable';
import TextView from '../common/components/TextView';

export default function LoginScreen({navigation}: any) {
  return (
    <View style={styles.lottieContainer}>
      <TextView large bold>
        Login
      </TextView>
      <TeamTouchable onPress={() => navigation.navigate('Main')}>
        <View
          style={{
            padding: 20,
            margin: 10,
            backgroundColor: blue100,
          }}>
          <TextView>Back</TextView>
        </View>
      </TeamTouchable>
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
