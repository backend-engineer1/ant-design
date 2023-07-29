import React from 'react';
import { DatePicker, Space } from 'antd';

const { RangePicker } = DatePicker;

const App: React.FC = () => (
  <Space direction="vertical" size={12}>
    <DatePicker
      cellRender={(current, info) => {
        if (info.type !== 'date') return info.originNode;
        const style: React.CSSProperties = {};
        if (current.date() === 1) {
          style.border = '1px solid #1677ff';
          style.borderRadius = '50%';
        }
        return (
          <div className="ant-picker-cell-inner" style={style}>
            {current.date()}
          </div>
        );
      }}
    />
    <RangePicker
      cellRender={(current, info) => {
        if (info.type !== 'date') return info.originNode;
        const style: React.CSSProperties = {};
        if (current.date() === 1) {
          style.border = '1px solid #1677ff';
          style.borderRadius = '50%';
        }
        return (
          <div className="ant-picker-cell-inner" style={style}>
            {current.date()}
          </div>
        );
      }}
    />
  </Space>
);

export default App;
