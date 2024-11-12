
import axios from 'axios';
import { message } from 'antd';

export const disableUser = async (userId) => {
  try {
    await axios.put(`/api/users/disable/${userId}`);
    message.success('Người dùng đã bị vô hiệu hóa!');
  } catch (error) {
    message.error('Có lỗi xảy ra!');
  }
};
