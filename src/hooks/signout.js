import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import useRedirect from './useRedirect';

const useSignOut = () => {
  const goTo = useRedirect();

  const logout = async () => {
    try {
      await signOut(auth);
      console.log('Користувач вийшов');
      goTo('/login');
    } catch (error) {
      console.error('Помилка при виході:', error.message);
    }
  };

  return logout;
};

export default useSignOut;
