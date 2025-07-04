import axios from 'axios';

export async function getData(uid, token) {
  try {
    const response = await axios.get(
      `https://react-auth-1867c-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}/dailyStats.json?auth=${token}`,
    );
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function patchData(uid, token, newData) {
  try {
    const response = await axios.patch(
      `https://react-auth-1867c-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}/dailyStats.json?auth=${token}`,
      newData,
    );
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
}
