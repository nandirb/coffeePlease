import React, { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { white } from '../../common/colors';
import Card from '../../common/components/Card';
import TextView from '../../common/components/TextView';
import { setNavigationHome } from '../../common/utils';

const AboutScreen: React.FC<any> = ({ navigation, route }: any) => {
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

export default AboutScreen;
