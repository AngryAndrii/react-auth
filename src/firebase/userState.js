import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';

const checkUser = (auth, user) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(uid);
    } else {
      console.log('user not signed');
    }
  });
};

export default checkUser(auth, user);
