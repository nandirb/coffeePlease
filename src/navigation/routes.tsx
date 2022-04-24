/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useReducer } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { AppProvider } from '../provider';
import { grey400, primary } from '../common/colors';

import HomeScreen from '../screen/home/Home';
import LoginScreen from '../screen/about/LoginScreen';
import StoreScreen from '../screen/store/container/Store';
import CartScreen from '../screen/cart/CartContainer';

import { useMutation } from '@apollo/client';
import { login } from '../screen/about/graphql/mutations';
import Loader from '../common/components/Loader';
import { AsyncStorage } from 'react-native';
import { useAlert } from '../hook';
import { AuthContext } from '../hook/useAuth';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome5';
import IconFeather from 'react-native-vector-icons/Feather';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';

import MyOrders from '../screen/Order/Orders';
import ProductDetailContainer from '../screen/store/container/ProductDetail';
import AboutContainer from '../screen/about/Profile/AboutContainer';

type StackParamList = {
  Login: undefined;
  About: undefined;
  LoginScreen: undefined;
  Splash: undefined;
  Back: undefined;
  Profile: undefined;
  MyOrders: undefined;
  Store: undefined;
  Cart: undefined;
  ProductDetail: undefined;
};

const RootStack = createStackNavigator<StackParamList>();
const Stack = createStackNavigator<StackParamList>();
const Tab = createBottomTabNavigator();

function HomeTab() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={() => ({
        tabBarActiveTintColor: primary,
        tabBarInactiveTintColor: 'gray',
        headerShown: true,
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="home-outline"
              color={focused ? primary : grey400}
              size={23}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Order"
        component={StoreScreen}
        options={{
          tabBarLabel: 'Order',
          tabBarIcon: ({ focused }) => (
            <IconFeather
              name="coffee"
              color={focused ? primary : grey400}
              size={23}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Store"
        component={StoreScreen}
        options={{
          tabBarLabel: 'Store',
          tabBarIcon: ({ focused }) => (
            <IconM
              name="storefront-outline"
              color={focused ? primary : grey400}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="About"
        component={AboutContainer}
        options={{
          tabBarLabel: 'About',
          tabBarIcon: ({ focused }) => (
            <IconFA name="user" color={focused ? primary : grey400} size={20} />
          ),
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

  const loginReducer = (prevState: any, action: { type: any; token: any }) => {
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
      dispatch({ type: 'LOGOUT', token: 'fgh' });
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
        // let loginToken = await AsyncStorage.getItem('loginToken');
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
              <RootStack.Screen
                name="Back"
                component={HomeTab}
                options={{ headerShown: false }}
              />
              <RootStack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
              <RootStack.Screen
                name="Cart"
                component={CartScreen}
                options={{ headerShown: true }}
              />
              <RootStack.Screen
                name="ProductDetail"
                component={ProductDetailContainer}
                options={{ headerShown: true }}
              />
              <RootStack.Screen
                name="Profile"
                component={AboutContainer}
                options={{ headerShown: false }}
              />
              <RootStack.Screen
                name="MyOrders"
                component={MyOrders}
                options={{ headerShown: true }}
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
