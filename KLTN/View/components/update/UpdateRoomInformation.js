import React, { useEffect } from 'react';
import { Form, Input, Button, message, Select } from 'antd';
import axios from 'axios';

const { Option } = Select;

const UpdateRoomInformation = ({ roomData, onUpdate, onClose }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(roomData); // Prepopulate form with selected room data
  }, [roomData, form]);

  const updateRoom = async (values) => {
    try {
      const updatedRoom = { key: roomData.key, ...values };

      // PUT request to update room info (Replace '/api/room-schedule' with your API)
      await axios.put(`/api/room-schedule/${roomData.key}`, updatedRoom);
      message.success('Cập nhật thông tin phòng thành công!');
      onUpdate(updatedRoom); // Callback to parent component to update state
      form.resetFields();
      onClose(); // Close the modal after updating
    } catch (error) {
      message.error('Cập nhật phòng học thất bại!');
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f2f5', borderRadius: '8px', maxWidth: '400px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>Cập Nhật Phòng Học</h2>
      <Form form={form} onFinish={updateRoom} layout="vertical">
        
        {/* Session field */}
        <Form.Item
          name="session"
          label="Ca Học"
          rules={[{ required: true, message: 'Vui lòng chọn ca học!' }]}
        >
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
                rules={[{ required: false }]}
              >
                <Select placeholder="Phòng" style={{ width: '30%' }}>
                  <Option value="trống">Trống</Option> {/* "Trống" as an option */}
                  {/* You can add other room options here */}
                </Select>
              </Form.Item>

              <Form.Item
                name={[day, 'time']}
                noStyle
                rules={[{ required: false }]}
              >
                <Input placeholder="Thời gian" style={{ width: '35%', marginLeft: '10px' }} />
              </Form.Item>

              <Form.Item
                name={[day, 'courseCode']}
                noStyle
                rules={[{ required: false }]}
              >
                <Input placeholder="Mã học phần" style={{ width: '30%', marginLeft: '10px' }} />
              </Form.Item>
            </Input.Group>
          </Form.Item>
        ))}

        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          Cập Nhật
        </Button>
      </Form>
    </div>
  );
};

export default UpdateRoomInformation;
