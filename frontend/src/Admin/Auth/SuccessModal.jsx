import React from "react";
import { Modal } from "antd";

const SuccessModal = ({ isVisible, message, onClose }) => {
  return (
    <Modal
      title="Notification"
      open={isVisible}
      onCancel={onClose}
      footer={null}
    >
      <p className="text-gray-600">{message}</p>
    </Modal>
  );
};

export default SuccessModal;
