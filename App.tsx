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
import { LogBox, StatusBar } from 'react-native';
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
  'RNVectorIconsManager',
  'AsyncStorage',
  'key',
  'data',
]);

const App: React.FC<{}> = () => {
  const logoutLink = onError(({ networkError, graphQLErrors }) => {
    console.log('--netError', networkError);
    console.log('--gqlError', graphQLErrors);
  });

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
