/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import {
  AsyncStorage,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import TextView from '../../common/components/TextView';
import useAuth from '../../hook/useAuth';
import { login } from './graphql/mutations';
import { Button, Touchable } from '../../common/components';
import { deviceWidth, ios } from '../../common/utils';
import { black, grey400, primary, secondary, white } from '../../common/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function LoginScreen({ navigation }: any) {
  const { signedIn } = useAuth();

  const [variables, setVariables] = useState<any>({
    email: 'nandir.be@gmail.com',
    password: 'Nandir123',
  });

  const [isLoading, setLoading] = useState<boolean>(false);

  const [loginMutation] = useMutation(login, {
    variables: variables,
  });

  function loginServer() {
    loginMutation({
      variables: {
        email: variables.email,
        password: variables.password,
      },
    })
      .then(res => {
        setLoading(false);
        signedIn();
      })
      .catch(() => {
        console.log('The email address or password you entered is incorrect.');
        setLoading(false);
      });
  }

  const onPressLogin = async () => {
    loginServer();
    setLoading(true);
  };
  const textInput = (iconName: string, placHolderText: string, value: any) => {
    return (
      <View
        style={[
          styles.block,
          {
            backgroundColor: white,
          },
        ]}>
        <FontAwesome name={iconName} size={20} color={primary} />
        <TextInput
          placeholder={placHolderText}
          placeholderTextColor={grey400}
          style={{
            padding: 10,
            color: black,
            width: '100%',
          }}
          secureTextEntry={iconName === 'lock' ? true : false}
          value={value}
          returnKeyType="done"
          onChangeText={text =>
            iconName === 'user'
              ? setVariables({ ...variables, email: text })
              : setVariables({ ...variables, password: text })
          }
          onSubmitEditing={() => {
            if (iconName === 'lock') {
              onPressLogin();
            }
          }}
        />
      </View>
    );
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: white }}
      behavior={ios ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View>
            {textInput('user', 'Email', variables.email)}
            {textInput('lock', 'Password', variables.password)}
          </View>
          <Touchable
            style={[styles.block, { backgroundColor: primary }]}
            onPress={() => {
              loginMutation()
                .then(_e => {
                  AsyncStorage.setItem('loginToken', 'loggedIn', () => {
                    signedIn();
                  });
                })
                .catch(e => {
                  console.log(e);
                });
            }}>
            <TextView large bold color={white}>
              Login
            </TextView>
          </Touchable>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: deviceWidth,
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

  block: {
    borderRadius: 15,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginHorizontal: 30,
    marginTop: 10,
    width: 300,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: primary,
  },
});
