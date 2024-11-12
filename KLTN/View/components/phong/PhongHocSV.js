import React, { useState, useEffect } from 'react';
import { Layout, Table, Row, Col, Card, Button, Typography, Input, Select, DatePicker } from 'antd';
import '../styles/PhongHoc.css';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;
const { Option } = Select;

const PhongHocSV = () => {
  const [dataSource, setDataSource] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  // Fetch data from the mock API
  useEffect(() => {
    fetch('https://672ab9d2976a834dd024325b.mockapi.io/phonghoc')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched data:', data); // Log fetched data for debugging
        setDataSource(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Search and filter handlers
  const handleSearch = (e) => setSearchQuery(e.target.value);
  const handleBuildingChange = (value) => setSelectedBuilding(value);
  const handleFloorChange = (value) => setSelectedFloor(value);
  const handleDateChange = (date) => setSelectedDate(date);

  // Filter the data based on the search query and selected filters (building, floor, date)
  const filteredData = dataSource.filter(item => {
    const matchesSearch = item.room ? item.room.includes(searchQuery) : false;
    const matchesBuilding = selectedBuilding ? item.building === selectedBuilding : true;
    const matchesFloor = selectedFloor ? item.floor === selectedFloor : true;
    const matchesDate = selectedDate ? item.date === selectedDate.format('YYYY-MM-DD') : true;
    return matchesSearch && matchesBuilding && matchesFloor && matchesDate;
  });

  // Columns for the table
  const columns = [
    { 
      title: 'Buổi Học', // Display Buổi Học instead of Ca Học
      dataIndex: 'session', 
      key: 'session', 
      align: 'center',
      render: (session) => (session === 'sáng' ? 'Sáng' : 'Chiều') // Display in Vietnamese
    },
    ...['thu2', 'thu3', 'thu4', 'thu5', 'thu6', 'thu7', 'cn'].map(day => ({
      title: `Thứ ${day.slice(3)}`, // Dynamically show "Thứ" labels
      dataIndex: day,
      key: day,
      align: 'center',
      render: (data) => data 
        ? <div style={{ padding: '8px', backgroundColor: '#e6f7ff', borderRadius: '5px', textAlign: 'center' }}>
            <strong>Phòng: {data.room}</strong><br />
            <span>Thời gian: {data.time}</span><br />
            <span>Mã Học Phần: {data.courseCode}</span> {/* Display courseCode */}
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

      <Content style={{ padding: '24px', overflowY: 'auto', maxHeight: 'calc(100vh - 134px)' }}>
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
          </Col>
        </Row>

        <Card style={{ borderRadius: '8px', border: '2px solid #1890ff', padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
          <Title level={4} style={{ color: '#1890ff', textAlign: 'center' }}>Lịch Phòng</Title>
          <Table
            dataSource={filteredData.length > 0 ? filteredData : dataSource} // Show dataSource if no filters match
            columns={columns}
            pagination={false}
            rowClassName="table-row"
            style={{ backgroundColor: '#e6f7ff' }}
            scroll={{ x: '100%', y: 400 }}
          />
        </Card>
      </Content>

      <Footer style={{ textAlign: 'center', backgroundColor: '#f0f2f5' }}>Created by Your Name ©2024</Footer>
    </Layout>
  );
};

export default PhongHocSV;
