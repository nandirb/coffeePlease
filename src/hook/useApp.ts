import {useContext} from 'react';
import {AppContext} from '../provider/AppProvider';

export default function useAppContext() {
  const mContext = useContext(AppContext);

  return mContext;
}
