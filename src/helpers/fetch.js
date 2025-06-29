import axios from 'axios';

async function getData() {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default getData;
