import { useQuery } from '@apollo/client';
import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { grey600, primary, white } from '../../common/colors';
import {
  Card,
  HeaderLeft,
  Loader,
  Modal,
  TextView,
} from '../../common/components';
import { setNavigationHome } from '../../common/utils';
import { useApp } from '../../hook';
import { myOrders } from './graphql/queries';

const MyOrders: React.FC<any> = ({ navigation, route }) => {
  useLayoutEffect(() => {
    setNavigationHome({
      navigation,
      headerLeft: <HeaderLeft back title={''} />,
      headerRight: <></>,
    });
  }, [navigation, route]);

  const app = useApp();

  const { data, loading } = useQuery(myOrders, {
    variables: { userId: app.currentUser._id },
  });

  if (loading) {
    <Loader />;
  }

  const [modal, setModal] = useState(false);

  const renderDetail = (items: any) => {
    return (
      <Modal isVisible={modal} onVisible={setModal(!modal)} shadowRadius={3}>
        {items?.map((i: any) => (
          <View>
            <View style={styles.row}>
              <TextView bold>{i?.product.name}: </TextView>
              <TextView bold color={grey600}>
                {i?.product.unitPrice} ₮
              </TextView>
              <TextView color={primary}> x{i?.count}</TextView>
            </View>
          </View>
        ))}
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      {data?.myOrders?.map((o: any) => (
        <Card
          onPress={() => {
            setModal(true);
            renderDetail(o.items);
          }}>
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

            {/* <QRCode value={o._id} /> */}
          </View>
        </Card>
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
