import React, { useState, useEffect } from 'react';
import { Layout, Card, Typography, Input, Modal, Form, Button, Avatar, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import '../styles/PhongHoc.css';

const { Title, Text } = Typography;

const Edituser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data when component mounts
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://672ab9d2976a834dd024325b.mockapi.io/user'); // Replace with your actual API endpoint
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        message.error('Không thể tải thông tin người dùng.');
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <Layout style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f2f5' }}>
      <Card style={{ width: 400, textAlign: 'center', padding: '24px', borderRadius: '8px' }}>
        <Avatar size={80} icon={<UserOutlined />} style={{ marginBottom: '16px' }} />
        <Title level={4}>Thông tin sinh viên</Title>
        <Text>MSSV: {userData ? userData.username : 'Loading...'}</Text>
        <br />
        <Text>Họ tên: {userData ? userData.name : 'Loading...'}</Text>
        <br />
        <Text>Giới tính: {userData ? userData.gender : 'Loading...'}</Text>
        <br />
        <Text>Ngày sinh: {userData ? userData.birthDate : 'Loading...'}</Text>
        <br />
        <Text>Nơi sinh: {userData ? userData.birthPlace : 'Loading...'}</Text>
        <br />
        <Button type="primary" style={{ marginTop: '16px' }} onClick={openModal}>
          Xem chi tiết
        </Button>
      </Card>

      {/* Modal for User Details */}
      <Modal title="Chi tiết người dùng" open={isModalOpen} onCancel={closeModal} footer={null}>
        <Form form={form} layout="vertical">
          <Form.Item label="ID Người Dùng" name="userId">
            <Input defaultValue={userData ? userData.username : 'Loading...'} disabled />
          </Form.Item>
          <Form.Item label="Tên" name="name">
            <Input defaultValue={userData ? userData.name : 'Loading...'} disabled />
          </Form.Item>
          <Form.Item label="Giới tính" name="gender">
            <Input defaultValue={userData ? userData.gender : 'Loading...'} disabled />
          </Form.Item>
          <Form.Item label="Ngày sinh" name="birthDate">
            <Input defaultValue={userData ? userData.birthDate : 'Loading...'} disabled />
          </Form.Item>
          <Form.Item label="Nơi sinh" name="birthPlace">
            <Input defaultValue={userData ? userData.birthPlace : 'Loading...'} disabled />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={closeModal}>
              Đóng
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default Edituser;
