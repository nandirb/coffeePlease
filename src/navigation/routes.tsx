/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useReducer } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { AppProvider } from '../provider';
import { brown300 } from '../common/colors';
import LoginScreen from '../screen/LoginScreen';
import Home from '../screen/Home';
import HelpScreen from '../screen/AboutScreen';
import Store from '../screen/store/Store';
import { useMutation } from '@apollo/client';
import { login } from '../screen/graphql/mutation';
import Loader from '../common/components/Loader';
import { AsyncStorage } from 'react-native';
import { useAlert } from '../hook';
import { AuthContext } from '../hook/useAuth';

type StackParamList = {
  Splash: undefined;
  Main: undefined;
  Profile: undefined;
  Cart: undefined;
  MyOrders: undefined;
  Store: undefined;
  Login: undefined;
  Help: undefined;
  Notification: undefined;
  LoginScreen: undefined;
};

const RootStack = createStackNavigator<StackParamList>();
const Stack = createStackNavigator<StackParamList>();
const Tab = createBottomTabNavigator();

function HomeTab() {
  return (
    <Tab.Navigator
      initialRouteName="Order"
      screenOptions={() => ({
        tabBarActiveTintColor: brown300,
        tabBarInactiveTintColor: 'gray',
        headerShown: true,
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Order"
        component={Store}
        options={{
          tabBarLabel: 'Order',
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Store}
        options={{
          tabBarLabel: 'Cart',
        }}
      />
      <Tab.Screen
        name="Help"
        component={HelpScreen}
        options={{
          tabBarLabel: 'About',
        }}
      />
    </Tab.Navigator>
  );
}

const AuthStackScreens = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'transparent',
          opacity: 1,
        },
        headerTransparent: true,
      }}>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};

export default function Routes() {
  const alert = useAlert();

  const [retrieveLoginMutation] = useMutation(login);

  const initialLoginState = {
    isLoading: false,
    loginToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RELOGIN':
        return {
          ...prevState,
          loginToken: action.token,
          isLoading: true,
        };
      case 'LOGIN':
        return {
          ...prevState,
          loginToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          loginToken: null,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem('loginToken');
      dispatch({ type: 'LOGOUT' });
    } catch (e) {
      console.log(e);
    }
  };

  const authContext = useMemo(
    () => ({
      signedIn: async () => {
        try {
          await AsyncStorage.setItem('loginToken', 'loggedIn');
          dispatch({
            type: 'LOGIN',
            token: 'loggedIn',
          });
        } catch (e) {
          console.log(e);
        }
      },

      signOut: () => {
        logOut();
      },
    }),
    [],
  );

  useEffect(() => {
    setTimeout(async () => {
      try {
        let loginToken = await AsyncStorage.getItem('loginToken');

        // if (loginToken !== null) {
        //   return retrieveLoginMutation({
        //     variables: {
        //       email: loggedUser.email,
        //       password: loggedUser.password,
        //       deviceToken,
        //     },
        //   })
        //     .then(res => {
        //       if (res.errors) {
        //         return alert.error(res.errors[0].message);
        //       }
        //       dispatch({
        //         type: 'LOGIN',
        //         token: loginToken,
        //       });
        //     })
        //     .catch(res => {
        //       alert.error(res.message);
        //       logOut();
        //     });
        // }
      } catch (e) {
        console.log(e);
      }
    }, 0);
  }, []);

  if (loginState.isLoading) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.loginToken !== null ? (
          <AppProvider>
            <RootStack.Navigator>
              {/* <RootStack.Screen
            name="Splash"
            component={SplashScreen}
            options={{headerShown: false}}
          /> */}
              <RootStack.Screen
                name="Main"
                component={HomeTab}
                options={{ headerShown: false }}
              />
              <RootStack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
            </RootStack.Navigator>
          </AppProvider>
        ) : (
          <AuthStackScreens />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
