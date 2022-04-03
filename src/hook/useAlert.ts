import { useContext } from 'react';
import { AlertContext } from '../provider/AlertProvider';

export default function useAlertContext() {
  const mContext = useContext(AlertContext);

  return mContext;
}
