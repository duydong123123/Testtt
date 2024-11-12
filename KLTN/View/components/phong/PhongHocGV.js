import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Card, Button, Typography, Input, Select, Modal, message, Table } from 'antd';
import '../styles/PhongHoc.css';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;
const { Option } = Select;

const PhongHocGV = () => {
  const [dataSource, setDataSource] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [isRequestModalVisible, setIsRequestModalVisible] = useState(false);

  // Fetch data from the API endpoint
  useEffect(() => {
    fetch('https://672ab9d2976a834dd024325b.mockapi.io/phonghoc') // Replace with your actual API endpoint
      .then(response => response.json())
      .then(data => setDataSource(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSearch = (e) => setSearchQuery(e.target.value);
  const handleBuildingChange = (value) => setSelectedBuilding(value);
  const handleFloorChange = (value) => setSelectedFloor(value);

  // Filter data based on search query and selected filters
  const filteredData = dataSource.filter(item => {
    const matchesSearch = item.session && item.session.includes(searchQuery);
    const matchesBuilding = selectedBuilding ? item.building === selectedBuilding : true;
    const matchesFloor = selectedFloor ? item.floor === selectedFloor : true;
    return matchesSearch && matchesBuilding && matchesFloor;
  });

  // Combine morning sessions
  const columns = [
    { 
      title: 'Buổi Học', // Change from 'Ca Học' to 'Buổi Học'
      dataIndex: 'session', 
      key: 'session', 
      align: 'center',
      render: (session) => (session === 'sáng' ? 'Sáng' : 'Chiều') // 'Sáng' for morning and 'Chiều' for afternoon
    },
    ...['thu2', 'thu3', 'thu4', 'thu5', 'thu6', 'thu7', 'cn'].map(day => ({
      title: `Thứ ${day.slice(3)}`, // Dynamically adjusts to "Thứ 2", "Thứ 3", etc.
      dataIndex: day,
      key: day,
      align: 'center',
      render: (data) => data 
        ? <div style={{ padding: '8px', backgroundColor: '#e6f7ff', borderRadius: '5px', textAlign: 'center' }} >
            <strong>Phòng: {data.room}</strong>
            <br />
            <span>Thời gian: {data.time}</span>
            <br />
            <span>Mã Học Phần: {data.courseCode}</span> {/* Display courseCode here */}
          </div> 
        : <div style={{ color: '#aaa' }}>Trống</div>
    })),
  ];
  

  const handleRequestChange = () => {
    // Logic for handling request to change schedule/room
    setIsRequestModalVisible(false);
    message.success('Yêu cầu thay đổi đã được gửi thành công!');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="header">
        <Row justify="center" align="middle" style={{ height: '100%' }}>
          <Col span={6} style={{ textAlign: 'center' }}>
            <img src="/assets/logo.png" alt="Logo" style={{ width: '80%', maxWidth: '150px' }} />
          </Col>
          <Col span={12} style={{ textAlign: 'center' }}>
            <Title level={3} style={{ marginBottom: 0 }}>TRƯỜNG ĐẠI HỌC CÔNG NGHIỆP TP. HỒ CHÍ MINH</Title>
            <Typography.Text type="danger" style={{ fontSize: '16px', fontWeight: 'bold' }}>CỔNG THÔNG TIN GIẢNG VIÊN</Typography.Text>
          </Col>
        </Row>
      </Header>

      <Content style={{ padding: '24px', overflowY: 'auto', maxHeight: 'calc(100vh - 134px)' }}>
        <Row justify="space-between" align="middle" style={{ marginBottom: 20 }}>
          <Col>
            <Input
              placeholder="Tìm kiếm theo ca học"
              value={searchQuery}
              onChange={handleSearch}
              style={{ width: 200, marginRight: 10 }}
            />
            <Select
              placeholder="Chọn tòa nhà"
              style={{ width: 150, marginRight: 10 }}
              onChange={handleBuildingChange}
            >
              <Option value="A">Tòa A</Option>
              <Option value="B">Tòa B</Option>
            </Select>
            <Select
              placeholder="Chọn tầng"
              style={{ width: 150, marginRight: 10 }}
              onChange={handleFloorChange}
            >
              <Option value="1">Tầng 1</Option>
              <Option value="2">Tầng 2</Option>
              <Option value="3">Tầng 3</Option>
            </Select>
            <Button type="primary" onClick={() => setIsRequestModalVisible(true)}>Yêu cầu thay đổi</Button>
          </Col>
        </Row>

        <Card style={{ borderRadius: '8px', border: '2px solid #1890ff', padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
          <Title level={4} style={{ color: '#1890ff', textAlign: 'center' }}>Lịch Phòng</Title>
          <Table
            dataSource={filteredData}
            columns={columns}
            pagination={false}
            rowClassName="table-row"
            style={{ backgroundColor: '#e6f7ff' }}
            scroll={{ x: '100%', y: 400 }}
          />
        </Card>

        <Modal
          title="Yêu cầu thay đổi"
          visible={isRequestModalVisible}
          onOk={handleRequestChange}
          onCancel={() => setIsRequestModalVisible(false)}
        >
          <p>Thông tin yêu cầu thay đổi</p>
          {/* Add form or fields as needed */}
        </Modal>
      </Content>

      <Footer style={{ textAlign: 'center', backgroundColor: '#f0f2f5' }}>
        <Typography.Text style={{ color: '#1890ff' }}>© 2024 Industrial University of Ho Chi Minh City</Typography.Text>
      </Footer>
    </Layout>
  );
};

export default PhongHocGV;
