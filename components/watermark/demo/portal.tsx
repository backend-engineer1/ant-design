import React from 'react';
import { Watermark, Modal, Drawer, Button, Space } from 'antd';

const placeholder = (
  <div
    style={{
      height: 300,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'rgba(150, 150, 150, 0.2)',
    }}
  >
    A mock height
  </div>
);

const App: React.FC = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [showDrawer, setShowDrawer] = React.useState(false);

  const closeModal = () => setShowModal(false);
  const closeDrawer = () => setShowDrawer(false);

  return (
    <>
      <Space>
        <Button onClick={() => setShowModal(true)}>Show Modal</Button>
        <Button onClick={() => setShowDrawer(true)}>Show Drawer</Button>
      </Space>

      <Watermark content="Ant Design">
        <Modal
          destroyOnClose
          open={showModal}
          title="Modal"
          onCancel={closeModal}
          onOk={closeModal}
        >
          {placeholder}
        </Modal>
        <Drawer destroyOnClose open={showDrawer} title="Drawer" onClose={closeDrawer}>
          {placeholder}
        </Drawer>
      </Watermark>
    </>
  );
};

export default App;
