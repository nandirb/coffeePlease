import { useContext } from 'react';
import { AppContext } from '../provider/AppProvider';

function useApp() {
  const app = useContext(AppContext);

  return app;
}
export default useApp;
