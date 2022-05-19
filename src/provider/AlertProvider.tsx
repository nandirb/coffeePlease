import React, { useState, createContext } from 'react';
import { Snackbar, DURATION, Colors } from 'react-native-erxes-ui';
import { IAlert, TAction, TAlert } from './types';
import Ionicons from 'react-native-vector-icons/Ionicons';
export const AlertContext = createContext({} as IAlert);
const { Provider } = AlertContext;

const initialAlert = {
  isOpen: false,
  message: '',
  type: '',
  backgroundColor: '',
  action: undefined,
};

function AlertProvider({ children }: any) {
  const [alertState, setAlertState] = useState<TAlert>(initialAlert);

  const onDismissSnackBar = () => {
    setAlertState({
      ...initialAlert,
      isOpen: false,
    });
  };

  const alert = (message?: string, action?: TAction) => {
    show(message, 'simple', Colors.blue500, action);
  };

  const info = (message?: string, action?: TAction) => {
    show(message, 'info', Colors.blue500, action);
  };

  const error = (message?: string, action?: TAction) => {
    show(message, 'error', Colors.red400, action);
  };

  const success = (message?: string, action?: TAction) => {
    show(message, 'success', Colors.lightGreen500, action);
  };

  const warn = (message?: string, action?: TAction) => {
    show(message, 'warn', Colors.amberA400, action);
  };

  const infinity = (message?: string, action?: TAction) => {
    show(message, 'infinity', Colors.blue500, action);
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
    warn: (message?: string, action?: TAction) => warn(message, action),
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
            ? DURATION.DURATION_MEDIUM
            : alertState.type === 'infinity'
            ? DURATION.DURATION_INFINITY
            : DURATION.DURATION_SHORT
        }
        message={alertState.message}
        action={alertState.action}
        leftIcon={
          <Ionicons
            name={
              alertState.type === 'error'
                ? 'alert-circle-outline'
                : alertState.type === 'success'
                ? 'checkmark-done-circle-outline'
                : 'information-circle-outline'
            }
            style={{ color: Colors.white }}
            size={18}
          />
        }
        wrapperStyle={{ backgroundColor: alertState.backgroundColor }}
      />
    </>
  );
}

export default AlertProvider;
