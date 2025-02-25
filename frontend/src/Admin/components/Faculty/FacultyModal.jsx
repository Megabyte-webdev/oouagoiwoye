import React from "react";
import { Modal } from "antd";
import FacultyForm from "./FacultyForm";

const FacultyModal = ({ visible = false, onCancel, onSubmit, title = "", fields = [], initialData = {} }) => {
  return (
    <Modal
      title={title || "Faculty Modal"}
      open={visible}
      onCancel={onCancel}
      footer={null}
      destroyOnClose
    >
      <FacultyForm
        title={title || "Faculty Form"}
        fields={fields}
        onSubmit={onSubmit}
        initialData={initialData || {}}
      />
    </Modal>
  );
};

export default FacultyModal;
