import React, {useLayoutEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {blue200, transparent} from '../common/colors';
import HeaderRight from '../common/components/HeaderRight';
import TeamTouchable from '../common/components/TeamTouchable';
import {setNavigationHome} from '../utils/utils';

const HelpScreen: React.FC<any> = ({navigation, route}: any) => {
  useLayoutEffect(() => {
    setNavigationHome({
      navigation,
      headerLeft: <></>,
      headerRight: <HeaderRight onPress={() => console.log('notif')} />,
    });
  }, [navigation, route]);

  const Item = ({text, screen}: any) => (
    <TeamTouchable onPress={() => navigation.navigate(screen)}>
      <View style={{backgroundColor: blue200, padding: 10, marginBottom: 10}}>
        <Text>{text}</Text>
      </View>
    </TeamTouchable>
  );

  return (
    <View style={styles.lottieContainer}>
      <Item text="My Profile" screen="Profile" />
      <Item text="Login" screen="Login" />
      <Item text="MyOrders" screen="MyOrders" />
    </View>
  );
};

const styles = StyleSheet.create({
  lottieContainer: {
    alignItems: 'center',
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: transparent,
  },
});

export default HelpScreen;
