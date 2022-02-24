/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {AppProvider} from '../provider';
import TestScreen from '../screen/TestScreen';
import SplashScreen from '../screen/SplashScreen';
import {View, Text, Button, StyleSheet} from 'react-native';
import {isIphoneWithNotch} from '../utils/utils';
import colors, {brown200, brown300} from '../common/colors';

type StackParamList = {
  Splash: undefined;
  Initial: undefined;
  Main: undefined;
  Coffee: undefined;
  Order: undefined;
  Store: undefined;
  Test: undefined;
};

const Stack = createStackNavigator<StackParamList>();
const RootStack = createStackNavigator<StackParamList>();
const Drawer = createDrawerNavigator<StackParamList>();
const Tab = createBottomTabNavigator();

type IRoute = {
  loggedUser?: any;
  fcmToken?: any;
};
type IAction = {
  type: string;
  token?: string | null;
};

function HomeTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarActiveTintColor: brown300,
        tabBarInactiveTintColor: 'gray',
        headerShown: true,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'ios-list-box' : 'ios-list';
          }

          // You can return any component that you like here!
          return <View />;
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="Order"
        component={OrderScreen}
        options={{
          tabBarLabel: 'Order',
        }}
      />
      <Tab.Screen
        name="Store"
        component={StoreScreen}
        options={{
          tabBarLabel: 'Store',
        }}
      />
    </Tab.Navigator>
  );
}

function OrderScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Order Screen</Text>
    </View>
  );
}

function StoreScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Store Screen</Text>
    </View>
  );
}
function HomeScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
    </View>
  );
}
export default function Routes() {
  return (
    <NavigationContainer>
      <AppProvider>
        <RootStack.Navigator>
          <RootStack.Screen
            name="Main"
            component={HomeTabs}
            options={{headerShown: false}}
          />
        </RootStack.Navigator>
      </AppProvider>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigatorContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navigator: {
    borderTopWidth: 0,
    backgroundColor: 'transparent',
    elevation: 30,
  },
  xFillLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 30,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 55,
    height: 55,
    borderRadius: 30,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  middleBtnContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: isIphoneWithNotch() ? 75 : 55,
    alignItems: 'center',
    zIndex: 1,
  },
});
