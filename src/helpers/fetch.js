import axios from 'axios';

async function getData(uid, token) {
  try {
    const response = await axios.get(
      `https://react-auth-1867c-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}/dailyStats.json?auth=${token}}`,
    );
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default getData;
