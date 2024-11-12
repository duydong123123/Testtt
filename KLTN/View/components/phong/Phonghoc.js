import React, { useState, useEffect } from 'react';
import { Layout, Menu, Table, Row, Col, Card, Button, Typography, Input, Select, DatePicker, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import AddNewRow from '../add/AddNewRow';
import UpdateRoomInformation from '../update/UpdateRoomInformation';
import StatisticsRoom from '../phong/StatisticsRoom'; // Import the StatisticsRoom component
import '../styles/PhongHoc.css';

const { Header, Sider, Content, Footer } = Layout;
const { Title } = Typography;
const { Option } = Select;

const PhongHoc = () => {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isAddRowVisible, setIsAddRowVisible] = useState(false);
  const [isUpdateRoomVisible, setIsUpdateRoomVisible] = useState(false);
  const [isStatisticsModalVisible, setIsStatisticsModalVisible] = useState(false);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch('https://672ab9d2976a834dd024325b.mockapi.io/phonghoc');
        if (response.ok) {
          const data = await response.json();
          setDataSource(data);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Search and filter handlers
  const handleSearch = (e) => setSearchQuery(e.target.value);
  const handleBuildingChange = (value) => setSelectedBuilding(value);
  const handleFloorChange = (value) => setSelectedFloor(value);
  const handleDateChange = (date) => setSelectedDate(date);
  
  const filteredData = dataSource.filter(item => {
    const matchesSearch = item.session.includes(searchQuery);
    const matchesBuilding = selectedBuilding ? item.building === selectedBuilding : true;
    const matchesFloor = selectedFloor ? item.floor === selectedFloor : true;
    const matchesDate = selectedDate ? item.session === selectedDate : true;
    
    return matchesSearch && matchesBuilding && matchesFloor && matchesDate;
  });

  // Handlers for Add and Update Modals
  const handleAddNewRow = (newRow) => {
    setDataSource([...dataSource, newRow]);
    setIsAddRowVisible(false);
  };

  const handleUpdateRoomInformation = (updatedRow) => {
    setDataSource(dataSource.map(row => row.key === updatedRow.key ? updatedRow : row));
    setIsUpdateRoomVisible(false);
  };

  const handleEditUser = () => {
    navigate('/edituser');
  };

  const columns = [
    { 
      title: 'Buổi Học', 
      dataIndex: 'session', 
      key: 'session', 
      align: 'center',
      render: (session) => (session === 'sáng' ? 'Sáng' : 'Chiều')
    },
    ...['thu2', 'thu3', 'thu4', 'thu5', 'thu6', 'thu7', 'cn'].map(day => ({
      title: `Thứ ${day.slice(3)}`, 
      dataIndex: day,
      key: day,
      align: 'center',
      render: (data) => data 
        ? <div style={{ padding: '8px', backgroundColor: '#e6f7ff', borderRadius: '5px', textAlign: 'center' }} >
            <strong>Phòng: {data.room}</strong>
            <br />
            <span>Thời gian: {data.time}</span>
            <br />
            <span>Mã Học Phần: {data.courseCode}</span>
          </div> 
        : <div style={{ color: '#aaa' }}>Trống</div>
    })),
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="header">
        <Row justify="center" align="middle" style={{ height: '100%' }}>
          <Col span={6} style={{ textAlign: 'center' }}>
            <img src="/assets/logo.png" alt="Logo" style={{ width: '80%', maxWidth: '150px' }} />
          </Col>
          <Col span={12} style={{ textAlign: 'center' }}>
            <Title level={3} style={{ marginBottom: 0 }}>TRƯỜNG ĐẠI HỌC CÔNG NGHIỆP TP. HỒ CHÍ MINH</Title>
            <Typography.Text type="danger" style={{ fontSize: '16px', fontWeight: 'bold' }}>CỔNG THÔNG TIN SINH VIÊN</Typography.Text>
          </Col>
        </Row>
      </Header>

      <Layout>
        <Sider width={220} className="site-layout-background">
          <Menu mode="vertical" defaultSelectedKeys={['all']}>
            <Menu.Item key="all">Tất cả</Menu.Item>
            <Menu.Item key="add" onClick={() => setIsAddRowVisible(true)}>Thêm phòng mới</Menu.Item>
            <Menu.Item key="update" onClick={() => setIsUpdateRoomVisible(true)}>Cập nhật phòng</Menu.Item>
            <Menu.Item key="edit-user" onClick={handleEditUser}>Chỉnh sửa người dùng</Menu.Item>
            <Menu.Item key="statistics" onClick={() => setIsStatisticsModalVisible(true)}>Thống Kê Phòng</Menu.Item>
          </Menu>
        </Sider>

        <Layout style={{ padding: '0 24px 24px' }}>
          <Content className="content" style={{ maxHeight: 'calc(100vh - 64px)', overflowY: 'auto' }}>
            <Row justify="space-between" align="middle" style={{ marginBottom: 20 }}>
              <Col>
                <Input 
                  placeholder="Tìm kiếm theo mã học phần" 
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
                <DatePicker onChange={handleDateChange} placeholder="Chọn ngày" />
              </Col>
              <Col>
                <Button type="ghost">Trở về</Button>
                <Button type="primary">Tiếp</Button>
              </Col>
            </Row>

            <Card style={{ borderRadius: '8px', border: '2px solid #1890ff', padding: '20px' }}>
              <Title level={4} style={{ color: '#1890ff', textAlign: 'center' }}>Lịch Phòng</Title>
              <Table
                dataSource={filteredData}
                columns={columns}
                pagination={false}
                rowClassName="table-row"
                style={{ backgroundColor: '#e6f7ff' }}
              />
            </Card>
          </Content>

          <Footer style={{ textAlign: 'center', backgroundColor: '#f0f2f5' }}>Created by Your Name ©2024</Footer>
        </Layout>
      </Layout>

      {/* Modals for Add, Update, and Statistics */}
      <Modal
        title="Thêm Phòng Mới"
        visible={isAddRowVisible}
        onCancel={() => setIsAddRowVisible(false)}
        footer={null}
      >
        <AddNewRow onAdd={handleAddNewRow} />
      </Modal>

      <Modal
        title="Cập Nhật Phòng"
        visible={isUpdateRoomVisible}
        onCancel={() => setIsUpdateRoomVisible(false)}
        footer={null}
      >
        <UpdateRoomInformation onUpdate={handleUpdateRoomInformation} />
      </Modal>

      <Modal
        title="Thống Kê Phòng"
        visible={isStatisticsModalVisible}
        onCancel={() => setIsStatisticsModalVisible(false)}
        footer={null}
        width={800}
      >
        <StatisticsRoom />
      </Modal>
    </Layout>
  );
};

export default PhongHoc;
