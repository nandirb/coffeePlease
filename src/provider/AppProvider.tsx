import {useAlert} from '../hook';
import React, {createContext, useEffect, useState, useRef} from 'react';
import {Text, View} from 'react-native';
import {IApplication} from './types';

export const AppContext = createContext({} as IApplication);

const {Provider} = AppContext;

function AppProvider({children}: any) {
  const alert = useAlert();
  //   const { signOut } = useAuth();

  const [user, setCurrentUser] = useState<any>();
  const choosenProduct = useRef<any>();
  const addedProduct = useRef<any>();

  const getChoosenProduct = () => {
    return choosenProduct.current;
  };

  const setChoosenProduct = (isEdit: boolean, product: any) => {
    if (choosenProduct) {
      choosenProduct.current = {isEdit: isEdit, product: product};
    }
  };

  const getAddedProduct = () => {
    return addedProduct.current;
  };

  const setAddedProduct = (isAdded: boolean, product: any) => {
    addedProduct.current = {isAdded: isAdded, product: product};
  };

  const checkPermission = (action: any) => {
    const allowed = (user && user?.permissionActions[action]) || false;
    !allowed && !action.includes('show') && alert.error('Permission required');
    return allowed;
  };

  const mContext: IApplication = {
    updateUser: () => {
      console.log('updateUser');
    },

    currentUser: user,
    getChoosenProduct: getChoosenProduct,
    setChoosenProduct: (isEdit, product) => setChoosenProduct(isEdit, product),
    getAddedProduct: getAddedProduct,
    setAddedProduct: (isAdded, product) => setAddedProduct(isAdded, product),
    notificationCounts: 0,
    updateUnreadNotificationCounts: () => {
      console.log('updateUnreadNotificationCounts');
    },
  };
  return (
    <>
      <Provider value={mContext}>
        <View style={{alignItems: 'center'}}>
          <Text>App provider</Text>
        </View>
      </Provider>
    </>
  );
}

export default AppProvider;
