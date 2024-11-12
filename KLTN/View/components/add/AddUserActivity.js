// utils/AddUserActivity.js
import axios from 'axios';
import { message } from 'antd';

export const addUserActivity = async (activity) => {
  try {
    await axios.post(`/api/users/add-activity`, { activity });
    message.success('Hoạt động đã được thêm thành công!');
  } catch (error) {
    message.error('Có lỗi xảy ra!');
  }
};
