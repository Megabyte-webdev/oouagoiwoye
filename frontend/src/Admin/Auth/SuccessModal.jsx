import React from "react";
import { Modal } from "antd";

const SuccessModal = ({ isVisible, onClose }) => {
  return (
    <Modal
      title="Login Successful"
      open={isVisible}
      onOk={onClose}
      onCancel={onClose}
      footer={null}
      
    >
      <p className="text-gray-600">You have logged in successfully! 🎉</p>
    </Modal>
  );
};

export default SuccessModal;
