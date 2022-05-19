/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import { useMutation } from '@apollo/client';
import React, { useLayoutEffect, useState } from 'react';
import {
  AsyncStorage,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import useAuth from '../../hook/useAuth';
import { login, register } from './graphql/mutations';
import { Modal, Touchable, TextView } from '../../common/components';
import { deviceWidth, ios, setNavigationHome } from '../../common/utils';
import { black, grey800, primary, white } from '../../common/colors';
import img from '../../../assets/images';
import { useAlert, useApp } from '../../hook';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen({ navigation }) {
  useLayoutEffect(() => {
    setNavigationHome({
      navigation,
      headerLeft: <></>,
      headerRight: <></>,
    });
  }, []);

  const { signedIn, signUp } = useAuth();
  const alert = useAlert();

  const [variables, setVariables] = useState<any>({
    email: 'nandir.be@gmail.com',
    password: 'Nandir123',
  });

  const [variablesSignUp, setVariablesSignUp] = useState<any>({
    email: null,
    password: null,
  });

  const [isLoading, setLoading] = useState<boolean>(false);
  const [resigterModal, setRegisterModal] = useState<boolean>(false);
  const [forgotPasswordModal, setForgotPasswordModal] =
    useState<boolean>(false);

  const [loginMutation] = useMutation(login, {
    variables: variables,
  });

  const [registerMutation] = useMutation(register, {
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
        alert.error('The email address or password you entered is incorrect.');
        setLoading(false);
      });
  }

  function registerServer() {
    registerMutation({
      variables: {
        email: variablesSignUp.email,
        password: variablesSignUp.password,
      },
    })
      .then(res => {
        setLoading(false);
        signUp();
      })
      .catch(() => {
        alert.error('The email address or password you entered is incorrect.');
        setLoading(false);
      });
  }

  const onPressLogin = async () => {
    loginServer();
    setLoading(true);
  };

  const onPressSignIn = async () => {
    registerServer();
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
        <TextInput
          placeholder={placHolderText}
          placeholderTextColor={grey800}
          style={{
            color: black,
            width: '100%',
            paddingHorizontal: 10,
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
  const main = img.findIndex(el => el.name === 'main');
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: white }}
      behavior={ios ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <Image source={img[main]?.source} style={{ marginBottom: 30 }} />
          <View>
            {textInput('user', 'Имэйл', variables.email)}
            {textInput('lock', 'Нууц үг', variables.password)}
          </View>

          <Touchable
            onPress={() => setForgotPasswordModal(true)}
            style={{
              height: 30,
              marginTop: 10,
            }}>
            <TextView
              bold
              small
              style={{
                color: primary,
                justifyContent: 'flex-end',
                paddingLeft: 180,
              }}>
              Нууц үг сэргээх
            </TextView>
          </Touchable>

          <Touchable
            style={[styles.block, { backgroundColor: primary, marginTop: 30 }]}
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
              Нэвтрэх
            </TextView>
          </Touchable>
          <Touchable
            style={[
              styles.block,
              { backgroundColor: white, borderColor: white },
            ]}
            onPress={() => setRegisterModal(true)}>
            <TextView large bold color={primary}>
              Бүртгүүлэх
            </TextView>
          </Touchable>

          {resigterModal && (
            <Modal
              bottom
              isVisible={resigterModal}
              onVisible={setRegisterModal}
              style={{ flexDirection: 'column' }}>
              <>
                <Touchable onPress={() => setRegisterModal(false)}>
                  <TextView>hide</TextView>
                </Touchable>
                {textInput('user', 'Имэйл', variables.email)}
                {textInput('lock', 'Нууц үг', variables.password)}
                <Touchable
                  style={[
                    styles.block,
                    { backgroundColor: primary, marginTop: 30 },
                  ]}
                  onPress={() => {
                    loginMutation()
                      .then(_e => {
                        AsyncStorage.setItem('loginToken', 'loggedIn', () => {
                          signedIn();
                        });

                        console.log(_e);
                      })
                      .catch(e => {
                        console.log(e);
                      });
                  }}>
                  <TextView large bold color={white}>
                    Бүртгүүлэх
                  </TextView>
                </Touchable>
              </>
            </Modal>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    paddingHorizontal: 30,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: primary,
  },
});
