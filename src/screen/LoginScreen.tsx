import { useMutation } from '@apollo/client';
import React from 'react';
import { AsyncStorage, StyleSheet, View } from 'react-native';
import { black, blue100, transparent } from '../common/colors';
import TeamTouchable from '../common/components/TeamTouchable';
import TextView from '../common/components/TextView';
import useAuth from '../hook/useAuth';
import { login } from './graphql/mutation';

export default function LoginScreen({ navigation }: any) {
  const { signedIn } = useAuth();

  const [loginMutation] = useMutation(login, {
    variables: {
      email: 'nandir.be@gmail.com',
      password: 'Nandir123',
    },
  });

  return (
    <View style={styles.lottieContainer}>
      <TeamTouchable
        onPress={() => {
          loginMutation()
            .then(e => {
              AsyncStorage.setItem('loginToken', 'loggedIn', () => {
                signedIn();
              });
            })
            .catch(e => {
              console.log(e);
            });
        }}>
        <TextView large bold>
          Login
        </TextView>
      </TeamTouchable>

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
