/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ApolloClient,
  ApolloProvider,
  from,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import React from 'react';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { utils } from '@react-native-firebase/app';
import { LogBox, StatusBar } from 'react-native';
import Routes from './src/navigation/routes';

import {} from './src/provider';
import AlertProvider from './src/provider/AlertProvider';
import { ios } from './src/common/utils';

LogBox.ignoreLogs([
  'UILib',
  'Require cycle',
  'onAnimatedValueUpdate',
  'EventEmitter.removeListener',
  'i18next',
  'NativeEventEmitter',
  '[react-native-gesture-handler]',
  'RNVectorIconsManager',
  'AsyncStorage',
  'key',
  'data',
]);

const App: React.FC<{}> = () => {
  const [loggedUser, setLoggedUser] = React.useState({});
  const [isToken, setToken] = React.useState(false);
  const logoutLink = onError(({ networkError, graphQLErrors }) => {
    console.log('--netError', networkError);
    console.log('--gqlError', graphQLErrors);
  });

  const initialUser = async () => {
    AsyncStorage.getItem('loggedUser')
      .then(e => {
        if (e) {
          const user = JSON.parse(e);
          setLoggedUser(user);
        }
      })
      .catch(e => console.log(e));
  };

  const httpLink = new HttpLink({
    uri: 'http://localhost:5000/graphql',
    credentials: 'include',
  });

  const socketLink = new WebSocketLink({
    uri: 'wss://test.com',
    options: {
      reconnect: true,
    },
  });

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    socketLink,
    from([logoutLink, httpLink]),
  );

  const client = () =>
    new ApolloClient({
      link: splitLink,
      cache: new InMemoryCache(),
    });

  React.useEffect(() => {
    // CodePush.notifyAppReady();

    initialUser();

    if (__DEV__) {
      if (ios) {
        requestUserPermission();
      } else {
        checkPlayServicesExample()
          .then(() => {
            getFcmToken();
          })
          .catch(e => {
            console.log('checkPlayServicesExample', e);
            setToken(false);
          });
      }
    }

    const unsubscribe = __DEV__
      ? messaging().onMessage(async remoteMessage => {
          console.log(JSON.stringify(remoteMessage));
        })
      : undefined;

    return unsubscribe;
  }, []);

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    console.log('here');

    if (enabled) {
      getFcmToken();
    }
  };

  async function checkPlayServicesExample() {
    const { status, isAvailable, hasResolution, isUserResolvableError } =
      utils().playServicesAvailability;
    // all good and valid \o/
    if (isAvailable) {
      return Promise.resolve();
    }

    // if the user can resolve the issue i.e by updating play services
    // then call Google Play's own/default prompting functionality
    if (isUserResolvableError || hasResolution) {
      switch (status) {
        case 1:
          // SERVICE_MISSING - Google Play services is missing on this device.
          // show something to user
          // and then attempt to install if necessary
          return utils().makePlayServicesAvailable();
        case 2:
          // SERVICE_VERSION_UPDATE_REQUIRED - The installed version of Google Play services is out of date.
          // show something to user
          // and then attempt to update if necessary
          return utils().resolutionForPlayServices();

        default:
          // some default dialog / component?
          // use the link below to tailor response to status codes to suit your use case
          // https://developers.google.com/android/reference/com/google/android/gms/common/ConnectionResult#SERVICE_VERSION_UPDATE_REQUIRED
          if (isUserResolvableError) {
            return utils().promptForPlayServices();
          }
          if (hasResolution) {
            return utils().resolutionForPlayServices();
          }
      }
    }
    // There's no way to resolve play services on this device
    // probably best to show a dialog / force crash the app
    return Promise.reject(
      new Error('Unable to find a valid play services version.'),
    );
  }

  const getFcmToken = async () => {
    try {
      const fcmToken = await messaging().getToken();
      console.log('token', fcmToken);
      if (fcmToken) {
        await AsyncStorage.setItem('deviceToken', fcmToken);
        messaging().setBackgroundMessageHandler(async remoteMessage => {
          console.log('Message handled in the background!', remoteMessage);
        });
      } else {
        console.log('Failed', 'No token received');
      }
      setToken(false);
    } catch (e) {
      setToken(false);
      console.log('getFcmToken', e);
    }
  };

  return (
    <ApolloProvider client={client()}>
      <AlertProvider>
        <StatusBar barStyle="dark-content" backgroundColor={'#fff'} />
        <Routes />
      </AlertProvider>
    </ApolloProvider>
  );
};

export default App;
