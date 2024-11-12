// utils/Setdefaultuser.js
import axios from 'axios';
import { message } from 'antd';

export const setDefaultUser = async (userId) => {
  try {
    await axios.post(`/api/users/set-default/${userId}`);
    message.success('Người dùng đã được đặt làm mặc định!');
  } catch (error) {
    message.error('Có lỗi xảy ra!');
  }
};
