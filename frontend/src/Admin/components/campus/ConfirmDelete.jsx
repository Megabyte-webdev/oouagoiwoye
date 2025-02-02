import React from 'react';
import { Modal } from 'antd';

const DeleteConfirmationModal = ({ visible, onCancel, onConfirm }) => {
  return (
    <Modal
      title="Delete Campus"
      open={visible}
      onOk={onConfirm}
      onCancel={onCancel}
      okText="Delete"
      cancelText="Cancel"
      okButtonProps={{ danger: true }}
    >
      <p>Are you sure you want to delete this campus?</p>
    </Modal>
  );
};

export default DeleteConfirmationModal;