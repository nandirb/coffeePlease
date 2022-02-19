import {createContext, useContext} from 'react';

export type IAuth = {
  signedIn: () => void;
  signOut: () => void;
};
export const AuthContext = createContext({} as IAuth);

function useApp() {
  const auth = useContext(AuthContext);

  return auth;
}
export default useApp;
