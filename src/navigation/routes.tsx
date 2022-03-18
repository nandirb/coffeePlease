import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {AppProvider} from '../provider';
import colors, {brown300} from '../common/colors';
import LoginScreen from '../screen/LoginScreen';
import Home from '../screen/Home';
import HelpScreen from '../screen/HelpScreen';
import Store from '../screen/store/Store';
import Order from '../screen/order/Order';
import Card from '../screen/Card';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from '../common/components/Icon';
type StackParamList = {
  Splash: undefined;
  Main: undefined;
  Profile: undefined;
  Order: undefined;
  MyOrders: undefined;
  Store: undefined;
  Login: undefined;
  Help: undefined;
  Notification: undefined;
  Card: undefined;
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
          tabBarIcon: () => (
            <Icon name="home" size={18} color={colors.primary} />
          ),
        }}
      />
      <Tab.Screen
        name="Order"
        component={Order}
        options={{
          tabBarLabel: 'Order',
        }}
      />
      <Tab.Screen
        name="Store"
        component={Store}
        options={{
          tabBarLabel: 'Store',
        }}
      />
      <Tab.Screen
        name="Help"
        component={HelpScreen}
        options={{
          tabBarLabel: 'Help',
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
          <RootStack.Screen
            name="Card"
            component={Card}
            options={{headerShown: false}}
          />
        </RootStack.Navigator>
      </AppProvider>
    </NavigationContainer>
  );
}
