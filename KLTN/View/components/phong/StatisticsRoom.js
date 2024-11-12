import React from 'react';
import { Card } from 'antd';

const StatisticsRoom = ({ totalRooms, availableRooms, bookedRooms }) => {
  return (
    <div>
      <Card title="Thống Kê Phòng" bordered={false}>
        <p>Tổng số phòng: {totalRooms}</p>
        <p>Phòng còn trống: {availableRooms}</p>
        <p>Phòng đã đặt: {bookedRooms}</p>
      </Card>
    </div>
  );
};

export default StatisticsRoom;
