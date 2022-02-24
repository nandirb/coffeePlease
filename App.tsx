/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react';
import {
  LogBox,
  StatusBar,
  View,
  Text,
  ActivityIndicator,
  SafeAreaViewBase,
  SafeAreaView,
} from 'react-native';
import Routes from './src/navigation/routes';

import {} from './src/provider';
import AlertProvider from './src/provider/AlertProvider';

LogBox.ignoreLogs([
  'UILib',
  'Require cycle',
  'onAnimatedValueUpdate',
  'EventEmitter.removeListener',
  'i18next',
  'NativeEventEmitter',
  '[react-native-gesture-handler]',
]);

const App: React.FC<{}> = () => {
  return (
    <AlertProvider>
      <StatusBar barStyle="dark-content" backgroundColor={'#fff'} />
      <Routes />
    </AlertProvider>
  );
};

export default App;
