import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {transparent} from '../common/colors';

const TestScreen: React.FC<any> = ({navigation}: any) => {
  return (
    <View style={styles.lottieContainer}>
      <Text>Test</Text>
      <Button
        title="Go to main"
        onPress={() => navigation.navigate('Coffee')}
      />
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
});

export default TestScreen;
