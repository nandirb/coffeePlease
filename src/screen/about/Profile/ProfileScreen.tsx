import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { white } from '../../../common/colors';
import TextView from '../../../common/components/TextView';

const ProfileScreen: React.FC<any> = () => {
  return (
    <SafeAreaView style={{ backgroundColor: white }}>
      <TextView>😍😍 My profile 😍😍</TextView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
