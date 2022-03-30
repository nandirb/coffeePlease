import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {AppProvider} from '../provider';
import {brown300} from '../common/colors';
import LoginScreen from '../screen/LoginScreen';
import Home from '../screen/Home';
import HelpScreen from '../screen/AboutScreen';
import Store from '../screen/store/Store';

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
};

const RootStack = createStackNavigator<StackParamList>();
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

export default function Routes() {
  return (
    <NavigationContainer>
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
            options={{headerShown: false}}
          />
          <RootStack.Screen
            name="Login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
        </RootStack.Navigator>
      </AppProvider>
    </NavigationContainer>
  );
}
