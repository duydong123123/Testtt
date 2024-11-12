import React from 'react';
import { Layout, Form, Input, Button, Typography, Row, Col, Card, message } from 'antd';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const { Header, Footer, Content } = Layout;
const { Title, Text } = Typography;

const TeacherLogin = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Default values for username and password
  const defaultValues = {
    username: 'teacher', // Default username (update as needed)
    password: 'teacher123', // Default password (update as needed)
  };

  // Handle form submission
  const onFinish = (values) => {
    console.log('Success:', values);

    // Simulate successful login
    if (values.username === defaultValues.username && values.password === defaultValues.password) {
      navigate('/phonghocgv'); // Redirect to PhongHocGV.js after successful login
    } else {
      message.error('Đăng nhập không thành công. Vui lòng thử lại.');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Header with logo */}
      <Header style={{ background: '#fff', padding: '0 50px', borderBottom: '1px solid #e8e8e8' }}>
        <Row justify="center" align="middle" style={{ height: '100%' }}>
          <Col span={6} style={{ textAlign: 'center' }}>
            <img src="/assets/logo.png" alt="Logo" style={{ width: '80%', maxWidth: '150px' }} />
          </Col>
          <Col span={12} style={{ textAlign: 'center' }}>
            <Title level={3} style={{ marginBottom: 0 }}>
              TRƯỜNG ĐẠI HỌC CÔNG NGHIỆP TP. HỒ CHÍ MINH
            </Title>
            <Text type="danger" style={{ fontSize: '16px', fontWeight: 'bold' }}>CỔNG THÔNG TIN GIÁO VIÊN</Text>
          </Col>
        </Row>
      </Header>

      <Content style={{ padding: '50px', backgroundColor: '#fff' }}>
        <Row gutter={[32, 0]} justify="center">
          {/* Events Section */}
          <Col xs={24} md={12}>
            <Card title="Tin Tức - Sự Kiện" bordered={false} style={{ borderRadius: '8px', borderColor: '#1890ff', borderWidth: '1px', borderStyle: 'solid' }}>
              {/* Event content here */}
            </Card>
          </Col>

          {/* Login Section */}
          <Col xs={24} md={12}>
            <Card bordered={false} style={{ borderRadius: '8px', borderColor: '#1890ff', borderWidth: '1px', borderStyle: 'solid' }}>
              <Title level={5} style={{ color: '#008000' }}>Cổng Thông Tin Giáo Viên</Title>
              <Form layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Form.Item label="Tài khoản" name="username" rules={[{ required: true, message: 'Vui lòng nhập tài khoản!' }]}>
                  <Input placeholder="Nhập tài khoản" />
                </Form.Item>
                <Form.Item label="Mật khẩu" name="password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
                  <Input.Password placeholder="Nhập mật khẩu" />
                </Form.Item>
                <div style={{ textAlign: 'right' }}>
                  <a href="/forgot-password" style={{ color: '#1890ff' }}>Quên mật khẩu?</a>
                </div>
                <Form.Item>
                  <Button type="primary" htmlType="submit" style={{ width: '100%', marginTop: '16px' }}>
                    Đăng Nhập
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </Content>

      {/* Footer section */}
      <Footer style={{ textAlign: 'center', backgroundColor: '#ffffff', borderTop: '1px solid #e8e8e8', padding: '20px 0' }}>
        <Text style={{ color: '#1890ff' }}>© 2024 Industrial University of Ho Chi Minh City</Text>
      </Footer>
    </Layout>
  );
};

export default TeacherLogin;
