import React from 'react';
import { Form, Input, Button, message, Select } from 'antd';
import axios from 'axios';

const { Option } = Select;

const AddNewRow = ({ onAdd }) => {
  const [form] = Form.useForm();

  const addNewRoom = async (values) => {
    try {
      const newRow = {
        key: Date.now().toString(), // Unique key
        ...values,
      };

      // POST request to API (update the URL with your actual API endpoint)
      await axios.post('https://672ab9d2976a834dd024325b.mockapi.io/phonghoc', newRow);
      message.success('Phòng học mới đã được thêm thành công!');
      form.resetFields();
      onAdd(newRow); // Callback to parent component
    } catch (error) {
      message.error('Thêm phòng học thất bại!');
    }
  };

  return (
    <div
      style={{
        padding: '40px',
        backgroundColor: '#f0f2f5',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h2 style={{ textAlign: 'center' }}>Thêm Phòng Mới</h2>
      <Form form={form} onFinish={addNewRoom} layout="vertical">
        
        {/* Session field */}
        <Form.Item
          name="session"
          label="Ca Học"
          rules={[{ required: true, message: 'Vui lòng chọn ca học!' }]}>
          <Select placeholder="Chọn ca học">
            <Option value="sáng">Sáng</Option>
            <Option value="chiều">Chiều</Option>
          </Select>
        </Form.Item>

        {/* Dynamic fields for each day of the week */}
        {['thu2', 'thu3', 'thu4', 'thu5', 'thu6', 'thu7', 'cn'].map(day => (
          <Form.Item key={day} label={`Thông tin ${day === 'cn' ? 'Chủ Nhật' : `Thứ ${day.slice(3)}`}`}>
            <Input.Group compact>
              <Form.Item
                name={[day, 'room']}
                noStyle
                rules={[{ required: false }]}>
                <Select placeholder="Phòng" style={{ width: '30%' }}>
                  <Option value="trống">Trống</Option> {/* Added "Trống" as an option */}
                  {/* You can add other room options here */}
                </Select>
              </Form.Item>

              <Form.Item
                name={[day, 'time']}
                noStyle
                rules={[{ required: false }]}>
                <Input placeholder="Thời gian" style={{ width: '35%', marginLeft: '10px' }} />
              </Form.Item>

              <Form.Item
                name={[day, 'courseCode']}
                noStyle
                rules={[{ required: false }]}>
                <Input placeholder="Mã học phần" style={{ width: '30%', marginLeft: '10px' }} />
              </Form.Item>
            </Input.Group>
          </Form.Item>
        ))}

        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          Thêm Phòng
        </Button>
      </Form>
    </div>
  );
};

export default AddNewRow;
