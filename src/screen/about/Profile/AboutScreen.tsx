/* eslint-disable react-native/no-inline-styles */
import React, { useLayoutEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import img from '../../../../assets/images';
import {
  green500,
  grey300,
  grey600,
  primary,
  white,
} from '../../../common/colors';
import Card from '../../../common/components/Card';
import TextView from '../../../common/components/TextView';
import Touchable from '../../../common/components/Touchable';
import { deviceWidth, setNavigationHome } from '../../../common/utils';
import { HeaderRight } from '../../../common/components';

const AboutScreen: React.FC<any> = ({ navigation, route, dataUser }: any) => {
  useLayoutEffect(() => {
    setNavigationHome({
      navigation,
      headerLeft: <></>,
      headerRight: <HeaderRight logout />,
    });
  }, [navigation, route]);

  const idx = img.findIndex(el => el.name === 'avatar');
  const rewardIdx = img.findIndex(el => el.name === 'reward');
  const checkIdx = img.findIndex(el => el.name === 'check');

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
          height: 150,
        }}>
        <Image
          source={img[idx].source}
          resizeMode={'contain'}
          style={{
            width: '100%',
            height: undefined,
            aspectRatio: 5,
            borderRadius: 20,
          }}
        />
        <TextView bold style={{ marginTop: 13 }}>
          {dataUser.fullName}
        </TextView>
        <TextView bold style={{ color: primary }}>
          {dataUser.point + ' оноо'}
        </TextView>
      </View>
      <Touchable>
        <View
          style={{
            height: 30,
            width: 100,
            borderRadius: 30,
            borderColor: grey300,
            borderWidth: 1,
            padding: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TextView>Edit profile</TextView>
        </View>
      </Touchable>
      {/* <Card onPress={() => navigation.navigate('Profile')}>
        <TextView>Profile</TextView>
      </Card> */}

      <View style={{ marginTop: 10, padding: 10 }}>
        <TextView bold large style={{ padding: 10 }}>
          Миний урамшуулал
        </TextView>
        <Card>
          {[...Array(6)].map((el, i) => (
            <View
              key={'reward' + i}
              style={{
                marginHorizontal: 1,
                height: 65,
                width: 55,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                resizeMode="contain"
                style={{
                  width: '100%',
                  height: undefined,
                  aspectRatio: 1,
                  opacity: i > 2 ? 0.3 : 1,
                }}
                source={img[rewardIdx].source}
              />
              {i < 3 && (
                <Image
                  style={{
                    width: 20,
                    height: 20,
                    position: 'absolute',
                    bottom: 5,
                    right: 5,
                  }}
                  source={img[checkIdx].source}
                />
              )}
              {i === 5 && (
                <TextView color={green500} bold xsmall>
                  Free
                </TextView>
              )}
            </View>
          ))}
        </Card>
      </View>

      <Card
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: deviceWidth * 0.95,
        }}
        onPress={() => navigation.navigate('MyOrders')}>
        <TextView bold>Захиалгын түүх</TextView>
        <Ionicons name="chevron-forward-outline" size={20} color={grey600} />
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
