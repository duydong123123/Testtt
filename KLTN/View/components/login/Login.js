import React from 'react';
import { Layout, Form, Input, Button, Checkbox, Typography, Row, Col, Card, message } from 'antd';
import { useNavigate, Link } from 'react-router-dom';

const { Header, Footer, Content } = Layout;
const { Title, Text } = Typography;

const Login = () => {
  const navigate = useNavigate();

  const defaultValues = {
    username: '20042851',
    password: '26012002',
    graduate: false,
  };

  const onFinish = (values) => {
    console.log('Success:', values);
    if (values.username === defaultValues.username && values.password === defaultValues.password) {
      navigate('/phonghocsv');
    } else {
      message.error('Đăng nhập không thành công. Vui lòng thử lại.');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', padding: '0 50px', borderBottom: '1px solid #e8e8e8' }}>
        <Row justify="center" align="middle" style={{ height: '100%' }}>
          <Col span={6} style={{ textAlign: 'center' }}>
            <img src="/assets/logo.png" alt="Logo" style={{ width: '80%', maxWidth: '150px' }} />
          </Col>
          <Col span={12} style={{ textAlign: 'center' }}>
            <Title level={3} style={{ marginBottom: 0 }}>TRƯỜNG ĐẠI HỌC CÔNG NGHIỆP TP. HỒ CHÍ MINH</Title>
            <Text type="danger" style={{ fontSize: '16px', fontWeight: 'bold' }}>CỔNG THÔNG TIN SINH VIÊN</Text>
          </Col>
        </Row>
      </Header>

      <Content style={{ padding: '50px', backgroundColor: '#fff' }}>
        <Row gutter={[32, 0]} justify="center">
          {/* News Section */}
          <Col xs={24} md={12}>
            <Card title="Tin Tức - Sự Kiện" bordered={false} style={{ borderRadius: '8px', borderColor: '#1890ff', borderWidth: '1px', borderStyle: 'solid' }}>
              <div style={{ marginBottom: '16px' }}>
                <Row>
                  <Col span={4}>
                    <Text strong style={{ color: 'blue', fontSize: '18px' }}>Tháng 9 <br /> 01</Text>
                  </Col>
                  <Col span={20}>
                    <Text>
                      <a href="#" style={{ color: '#1890ff', fontWeight: '500' }}>Hướng dẫn học trực tuyến bằng MS-TEAM</a> <br />
                      Hướng dẫn học sinh học trực tuyến <br />
                      <a href="#" style={{ color: 'red' }}>Xem chi tiết</a>
                    </Text>
                  </Col>
                </Row>
              </div>
              <div>
                <Row>
                  <Col span={4}>
                    <Text strong style={{ color: 'blue', fontSize: '18px' }}>Tháng 9 <br /> 02</Text>
                  </Col>
                  <Col span={20}>
                    <Text>
                      <a href="#" style={{ color: '#1890ff', fontWeight: '500' }}>Hướng dẫn xem phòng học trên web</a> <br />
                      Hướng dẫn sinh viên xem phòng học <br />
                      <a href="#" style={{ color: 'red' }}>Xem chi tiết</a>
                    </Text>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>

          {/* Login Section */}
          <Col xs={24} md={12}>
            <Card bordered={false} style={{ borderRadius: '8px', borderColor: '#1890ff', borderWidth: '1px', borderStyle: 'solid' }}>
              <Title level={5} style={{ color: '#008000' }}>Cổng Thông Tin Sinh Viên</Title>
              <Form layout="vertical" initialValues={defaultValues} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Form.Item label="Tài khoản" name="username" rules={[{ required: true, message: 'Vui lòng nhập tài khoản!' }]}>
                  <Input placeholder="Nhập tài khoản" />
                </Form.Item>
                <Form.Item label="Mật khẩu" name="password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
                  <Input.Password placeholder="Nhập mật khẩu" />
                </Form.Item>
                <Form.Item name="graduate" valuePropName="checked">
                  <Checkbox>Đã tốt nghiệp</Checkbox>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" style={{ width: '100%' }}>Đăng Nhập</Button>
                </Form.Item>
              </Form>

              {/* Forgot Password Link */}
              <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <Link to="/forgot-password" style={{ color: '#1890ff' }}>Quên mật khẩu?</Link>
              </div>

              {/* Link Section */}
              <Row justify="space-between" style={{ marginTop: '10px' }}>
                <Col>
                  <Link to="/admin-login" style={{ color: '#1890ff' }}>Dành cho chuyên viên</Link>
                </Col>
                <Col>
                  <Link to="/teacher-login" style={{ color: '#1890ff' }}>Dành cho giáo viên</Link>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Content>

      <Footer style={{ textAlign: 'center', backgroundColor: '#ffffff', borderTop: '1px solid #e8e8e8' }}>
        <Text style={{ color: '#1890ff' }}>© 2024 Industrial University of Ho Chi Minh City</Text>
      </Footer>
    </Layout>
  );
};

export default Login;
