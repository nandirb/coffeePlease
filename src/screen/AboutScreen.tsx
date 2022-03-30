import React, {useLayoutEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {grey600, primary, white} from '../common/colors';
import Card from '../common/components/Card';
import TeamTouchable from '../common/components/TeamTouchable';
import TextView from '../common/components/TextView';
import {setNavigationHome} from '../utils/utils';

const HelpScreen: React.FC<any> = ({navigation, route}: any) => {
  useLayoutEffect(() => {
    setNavigationHome({
      navigation,
      headerLeft: <></>,
      headerRight: <></>,
    });
  }, [navigation, route]);

  return (
    <View style={styles.container}>
      <Card onPress={() => navigation.navigate('Profile')}>
        <TextView>Profile</TextView>
      </Card>
      <Card onPress={() => navigation.navigate('MyOrders')}>
        <TextView>Захиалгын түүх</TextView>
      </Card>

      {/* <TeamTouchable style={{position: 'absolute', bottom: 60, left: 180}}>
        <TextView bold style={{color: grey600}}>
          {' '}
          Гарах{' '}
        </TextView>
      </TeamTouchable> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: white,
  },
});

export default HelpScreen;
