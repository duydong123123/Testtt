import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

const UpdateUserActivity = () => {
  const [form] = Form.useForm();

  const handleUpdate = async (values) => {
    try {
      await axios.put(`/api/user-activities/${values.userId}`, values); // Replace with your API endpoint
      message.success('Hoạt động người dùng đã được cập nhật!');
      form.resetFields();
    } catch (error) {
      message.error('Có lỗi xảy ra!');
    }
  };

  return (
    <Form form={form} onFinish={handleUpdate} layout="inline">
      <Form.Item name="userId" label="ID Người Dùng" rules={[{ required: true, message: 'Vui lòng nhập ID người dùng!' }]}>
        <Input placeholder="Nhập ID người dùng" />
      </Form.Item>
      <Form.Item name="activity" label="Hoạt Động" rules={[{ required: true, message: 'Vui lòng nhập hoạt động!' }]}>
        <Input placeholder="Nhập hoạt động" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Cập Nhật</Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateUserActivity;
