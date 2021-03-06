/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { useApp, useAuth } from '../../hook';
import Touchable from './Touchable';
import IconFA from 'react-native-vector-icons/FontAwesome5';
import { primary, red50, red500, red700, redA700, white } from '../colors';
import TextView from './TextView';
import { View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button, Modal } from '.';

const HeaderRight: React.FC<any> = ({ logout }: any) => {
  const navigation = useNavigation<any>();
  const app = useApp();
  const { signOut } = useAuth();

  const [itemCnt, setItemCnt] = useState(app.cartItemCont);
  const [modal, showModal] = useState(false);

  const modalText = 'Та гарахдаа итгэлтэй байна уу?';

  useEffect(() => setItemCnt(app.cartItemCont), [app.cartItemCont]);
  return (
    <>
      {logout ? (
        <Touchable
          style={{ paddingHorizontal: 15 }}
          onPress={() => {
            showModal(true);
          }}>
          <Ionicons name="log-out-outline" size={26} color={primary} />
        </Touchable>
      ) : (
        <Touchable
          onPress={() => navigation.navigate('Cart')}
          style={{ paddingHorizontal: 15, padding: 10 }}>
          <IconFA name={'shopping-basket'} size={20} color={primary} />
          {itemCnt > 0 && (
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                right: 10,
                backgroundColor: red500,
                borderRadius: 10,
                width: 15,
                height: 15,
                justifyContent: 'center',
                alignContent: 'center',
                flexDirection: 'row',
                padding: 3,
              }}>
              <TextView color={white} xxsmall bold>
                {itemCnt}
              </TextView>
            </View>
          )}
        </Touchable>
      )}
      <Modal isVisible={modal} onVisible={showModal}>
        <TextView> {modalText}</TextView>
        <View
          style={{
            width: '100%',
            justifyContent: 'space-around',
            flexDirection: 'row',
            marginTop: 20,
          }}>
          <Button width={100} onPress={() => showModal(false)} text={'Болих'} />
          <Button
            width={100}
            secondary
            backgroundColor={white}
            onPress={() => signOut()}
            text={'Гарах'}
          />
        </View>
      </Modal>
    </>
  );
};

export default HeaderRight;
