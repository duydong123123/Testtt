
import axios from 'axios';

export const searchUsers = async (dataSource, searchTerm) => {
  try {
    const response = await axios.get(`/api/users?search=${searchTerm}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return dataSource;
  }
};
