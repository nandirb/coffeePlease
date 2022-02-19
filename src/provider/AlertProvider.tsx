import React, {useState, createContext} from 'react';
import colors from '../common/colors';
import Snackbar from '../common/components/Snackbar';
import {IAlert, TAction, TAlert} from './types';

export const AlertContext = createContext({} as IAlert);

const {Provider} = AlertContext;

function AlertProvider({children}: any) {
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

  const alert = (message?: string, action?: TAction) => {
    show(message, 'simple', colors.colorSecondary, action);
  };

  const info = (message?: string, action?: TAction) => {
    show(message, 'info', colors.colorCoreBlue, action);
  };

  const error = (message?: string, action?: TAction) => {
    show(message, 'error', colors.colorError, action);
  };

  const success = (message?: string, action?: TAction) => {
    show(message, 'success', colors.colorSuccess, action);
  };

  const infinity = (message?: string, action?: TAction) => {
    show(message, 'infinity', colors.colorCoreBlue, action);
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
    alert: (message?: string, action?: TAction) => alert(message, action),
    error: (message?: string, action?: TAction) => error(message, action),
    success: (message?: string, action?: TAction) => success(message, action),
    info: (message?: string, action?: TAction) => info(message, action),
    infinity: (message?: string, action?: TAction) => infinity(message, action),
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
            ? Snackbar.DURATION_MEDIUM
            : alertState.type === 'infinity'
            ? Snackbar.DURATION_INFINITY
            : Snackbar.DURATION_SHORT
        }
        action={alertState.action}
        backgroundColor={alertState.backgroundColor}>
        {alertState.message}
      </Snackbar>
    </>
  );
}

export default AlertProvider;
