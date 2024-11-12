import React from 'react';
import { Layout, Form, Input, Button, message, Typography, Row, Col, Card } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../View/components/styles/App.css'; // Assuming you have global styles here

const { Title, Text } = Typography;
const { Header, Footer, Content } = Layout;

const ForgotPasswordActivity = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate(); // Initialize navigate

  const handleForgotPassword = async (values) => {
    try {
      // Replace with your API endpoint for sending the reset password email
      await axios.post('/api/users/forgot-password', { email: values.email });
      message.success('Yêu cầu đặt lại mật khẩu đã được gửi!');
      form.resetFields();

      // Navigate to the UpdatePasswordActivity after successful request
      navigate('/update-password'); // Change the path according to your routing setup
    } catch (error) {
      message.error('Có lỗi xảy ra. Vui lòng kiểm tra lại email của bạn.');
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}> {/* Matching the background style */}
      {/* Header with logo and title */}
      <Header style={{ background: '#fff', padding: '0 50px', borderBottom: '1px solid #e8e8e8' }}>
        <Row justify="center" align="middle" style={{ height: '100%' }}>
          <Col span={6} style={{ textAlign: 'center' }}>
            <img src="/assets/logo.png" alt="Logo" style={{ width: '80%', maxWidth: '150px' }} />
          </Col>
          <Col span={12} style={{ textAlign: 'center' }}>
            <Title level={3} style={{ marginBottom: 0 }}>
              TRƯỜNG ĐẠI HỌC CÔNG NGHIỆP TP. HỒ CHÍ MINH
            </Title>
            <Text type="danger" style={{ fontSize: '16px', fontWeight: 'bold' }}>CỔNG THÔNG TIN SINH VIÊN</Text>
          </Col>
        </Row>
      </Header>

      <Content style={{ padding: '50px', display: 'flex', justifyContent: 'center', backgroundColor: '#fff' }}>
        <Row justify="center" style={{ width: '100%', maxWidth: '600px' }}> {/* Centering the form */}
          <Col xs={24}>
            <Card bordered={false} style={{ borderRadius: '8px', borderColor: '#1890ff', borderWidth: '1px', borderStyle: 'solid' }}>
              <Title level={5} style={{ color: '#008000', textAlign: 'center' }}>Quên Mật Khẩu</Title>
              <Form form={form} onFinish={handleForgotPassword} layout="vertical">
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: 'Vui lòng nhập địa chỉ email của bạn!' },
                    { type: 'email', message: 'Email không hợp lệ!' },
                  ]}
                >
                  <Input placeholder="Nhập địa chỉ email của bạn" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                    Gửi Yêu Cầu
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </Content>

      {/* Footer section */}
      <Footer style={{ textAlign: 'center', backgroundColor: '#ffffff', borderTop: '1px solid #e8e8e8' }}>
        <Text style={{ color: '#1890ff' }}>© 2024 Industrial University of Ho Chi Minh City</Text>
      </Footer>
    </Layout>
  );
};

export default ForgotPasswordActivity;
