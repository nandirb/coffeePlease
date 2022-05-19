/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
import { useQuery } from '@apollo/client';
import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { grey600, primary, white } from '../../common/colors';
import { HeaderLeft, Modal } from '../../common/components';
import {
  TextView,
  Loader,
  ExpandableSection,
  Colors,
  Divider,
  Touchable,
} from 'react-native-erxes-ui';
import QRCode from 'react-native-qrcode-svg';
import { setNavigationHome } from '../../common/utils';
import { useApp } from '../../hook';
import { myOrders } from './graphql/queries';
import Color from 'color';

const MyOrders: React.FC<any> = ({ navigation, route }) => {
  useLayoutEffect(() => {
    setNavigationHome({
      navigation,
      headerLeft: <HeaderLeft back title={''} />,
      headerRight: <></>,
    });
  }, [navigation, route]);

  const app = useApp();
  const [modal, setModal] = useState(false);

  const { data, loading } = useQuery(myOrders, {
    variables: { userId: app?.currentUser._id },
  });

  if (loading) {
    <Loader />;
  }

  const [expand, setExpanded] = useState(false);

  return (
    <View style={styles.container}>
      {data?.myOrders?.map((o: any, index: any) => (
        <ExpandableSection
          key={index}
          expanded={expand}
          setExpanded={setExpanded}
          onPress={() => console.log(expand)}
          containerStyle={{
            borderWidth: 1,
            borderColor: Colors.grey200,
            borderRadius: 10,
            marginBottom: 8,
          }}
          sectionHeader={
            <View style={styles.item}>
              <View style={styles.row}>
                <TextView bold color={primary}>
                  {o?.totalPrice} ₮
                </TextView>
                <TextView color={primary}> {o?.status}</TextView>
              </View>

              <TextView xxsmall color={grey600}>
                {o?.createdAt.substring(0, 25)}
              </TextView>
            </View>
          }>
          <Divider style={{ marginVertical: 10 }} />
          <TextView
            bold
            large
            center
            style={{ marginStart: 10, marginBottom: 10 }}
            color={grey600}>
            {'Захиалгын дэлгэрэнгүй'}
          </TextView>
          {o?.items.map(el => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}>
                <TextView bold color={Colors.grey700}>
                  {el?.product?.name}
                </TextView>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TextView small color={Colors.grey700}>
                    {el?.product?.unitPrice + ' x ' + el?.count + ' = '}
                    <TextView bold>
                      {el?.product?.unitPrice * el?.count}
                    </TextView>
                  </TextView>
                </View>
              </View>
            );
          })}
          <TextView
            bold
            color={Colors.grey700}
            style={{ marginStart: 10, marginVertical: 20 }}>
            {`Хүргэлтийн төрөл: ${o?.deliverType}`}
          </TextView>

          <Touchable
            style={{ height: 50, justifyContent: 'center' }}
            onPress={() => setModal(!modal)}>
            <TextView center bold large color={'#FE6E4C'}>
              QR харах
            </TextView>
          </Touchable>
          <Modal
            isVisible={modal}
            onVisible={setModal}
            style={{
              paddingVertical: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <QRCode size={250} value={o?._id} />
          </Modal>
        </ExpandableSection>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  container: { padding: 10, backgroundColor: white, flex: 1 },
  item: {
    flexDirection: 'column',
    width: '100%',
    alignItems: 'flex-end',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    width: '100%',
  },
});

export default MyOrders;
