import React, { useState } from 'react';
import { Input, Button, Table } from 'antd';
import axios from 'axios';

const SearchClassSchedule = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dataSource, setDataSource] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/class-schedule?search=${searchTerm}`); // Replace with your API endpoint
      setDataSource(response.data);
    } catch (error) {
      console.error('Error fetching class schedule:', error);
    }
  };

  return (
    <div>
      <Input
        placeholder="Nhập tên lớp học"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: '300px', marginRight: '10px' }}
      />
      <Button type="primary" onClick={handleSearch}>Tìm Kiếm</Button>

      <Table
        dataSource={dataSource}
        columns={[
          { title: 'Lớp', dataIndex: 'className', key: 'className' },
          { title: 'Giáo viên', dataIndex: 'teacher', key: 'teacher' },
          { title: 'Thời gian', dataIndex: 'time', key: 'time' },
        ]}
        pagination={false}
        style={{ marginTop: '20px' }}
      />
    </div>
  );
};

export default SearchClassSchedule;
