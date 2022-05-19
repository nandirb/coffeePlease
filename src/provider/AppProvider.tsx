/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAlert } from '../hook';
import React, { createContext, useEffect, useState, useRef } from 'react';
import { Text, View } from 'react-native';
import { IApplication } from './types';
import { applyNextFetchPolicy, useQuery } from '@apollo/client';
import { currentUser } from '../screen/about/graphql/queries';
import Loader from '../common/components/Loader';

export const AppContext = createContext({} as IApplication);

const { Provider } = AppContext;

function AppProvider({ children }: any) {
  const alert = useAlert();

  const { data, loading } = useQuery(currentUser);
  const [user, setCurrentUser] = useState<any>();
  const [products, addtoCart] = useState<any>([]);
  const [cnt, setCnt] = useState(0);

  const addCart = (p: any) => {
    const idx = products.findIndex(
      (pr: { product: { _id: any } }) => pr.product?._id === p._id,
    );

    if (idx === -1) {
      addtoCart((oldArray: any) => [...oldArray, { product: p, count: 1 }]);
    } else {
      products[idx].count++;
    }

    alert.info(`${p.name} сагсанд нэмэгдлээ`);
  };

  const clearCart = () => {
    setCnt(0);
    addtoCart([]);
  };

  const getCartItems = () => {
    return products;
  };

  const [cartTotal, setCartTotal] = useState<any>(0);
  const updateTotal = () => {
    let totalPrice = 0;
    products.forEach(
      (pr: { product: { unitPrice: number }; count: number }) => {
        totalPrice = totalPrice + pr.product?.unitPrice * pr.count;
      },
    );
    setCartTotal(totalPrice);
  };

  useEffect(() => {
    updateTotal();
  }, [cnt]);

  const remItem = (p: any) => {
    const idx = products.findIndex(
      (pr: { product: { _id: any } }) => pr.product?._id === p._id,
    );
    products.splice(idx, 1);
  };

  const updateProductCnt = (p: any, type: string) => {
    const idx = products.findIndex(
      (pr: { product: { _id: any } }) => pr.product?._id === p._id,
    );
    if (type === '+') {
      products[idx].count++;
    }
    if (type === '-') {
      if (products[idx].count > 0) {
        products[idx].count--;
      } else {
        remItem(p);
      }
    }
  };

  useEffect(() => {
    if (data) {
      setCurrentUser(data?.currentUser);
    }
  }, [data]);

  const mContext: IApplication = {
    updateUser: () => {
      console.log('updateUser');
    },
    currentUser: user,
    notificationCounts: 0,
    updateUnreadNotificationCounts: () => {
      console.log('updateUnreadNotificationCounts');
    },
    cartItemCont: cnt,
    cartProducts: getCartItems,
    addItemCount: () => setCnt(cnt + 1),
    addtoCart: addCart,
    removeItem: remItem,
    clearCart: clearCart,
    cartTotalPrice: cartTotal,
    updateCartTotal: updateTotal,
    updateProductCount: updateProductCnt,
  };

  return (
    <>
      <Provider value={mContext}>{children}</Provider>
    </>
  );
}

export default AppProvider;
