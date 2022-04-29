import React, { useState, createContext } from 'react';
import { blue500, colorError, colorSuccess } from '../common/colors';
import { Snackbar, DURATION } from 'react-native-erxes-ui';
import { IAlert, TAction, TAlert } from './types';
import Ionicons from 'react-native-vector-icons/Ionicons';
export const AlertContext = createContext({} as IAlert);

const { Provider } = AlertContext;

function AlertProvider({ children }: any) {
  const initialAlert = {
    isOpen: false,
    message: 'This',
    type: '',
    backgroundColor: 'transparent',
    action: undefined,
  };

  const [alertState, setAlertState] = useState<TAlert>(initialAlert);

  const onDismissSnackBar = () => {
    setAlertState({
      ...initialAlert,
      isOpen: false,
    });
  };

  const info = (message?: string, action?: TAction) => {
    show(message, 'info', blue500, action);
  };

  const error = (message?: string, action?: TAction) => {
    show(message, 'error', colorError, action);
  };

  const success = (message?: string, action?: TAction) => {
    show(message, 'success', colorSuccess, action);
  };

  const show = (
    message?: string,
    type?: string,
    backgroundColor?: string,
    action?: TAction,
  ) => {
    setAlertState({
      ...initialAlert,
      isOpen: true,
      message: message,
      type: type,
      backgroundColor: backgroundColor,
      action,
    });
  };

  const mContext: IAlert = {
    error: (message?: string, action?: TAction) => error(message, action),
    success: (message?: string, action?: TAction) => success(message, action),
    info: (message?: string, action?: TAction) => info(message, action),
    isShowing: () => alertState.isOpen,
  };

  return (
    <>
      <Provider value={mContext}>{children}</Provider>
      <Snackbar
        visible={alertState.isOpen}
        onDismiss={onDismissSnackBar}
        type={alertState.type}
        duration={
          alertState.type === 'error'
            ? DURATION.DURATION_MEDIUM
            : alertState.type === 'infinity'
            ? DURATION.DURATION_INFINITY
            : DURATION.DURATION_SHORT
        }
        rightIcon={<Ionicons name="close-outline" size={15} color={'#fff'} />}
        action={alertState.action}
        message={alertState.message || ''}
      />
    </>
  );
}

export default AlertProvider;
