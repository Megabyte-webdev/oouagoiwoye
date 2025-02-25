import React from "react";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";

const FacultyCard = ({ faculty = {}, onEdit, onDelete, onView }) => {
  return (
    <Card
      title={faculty?.title || "Faculty Title Unavailable"}
      actions={[
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={() => onView(faculty)}
        />,
        <Button
          type="link"
          icon={<EditOutlined />}
          onClick={() => onEdit(faculty)}
        />,
        <Button
          type="link"
          icon={<DeleteOutlined />}
          onClick={() => onDelete(faculty?.id || "")}
        />,
      ]}
    >
      <p>
        <strong>Dean:</strong> {faculty?.deanName || "Dean information not available"}
      </p>
      <p>
        <strong>Departments:</strong> {faculty?.noOfDepartments || "No departments listed"}
      </p>
      <p>
        <strong>About:</strong> {faculty?.body || "Description not provided"}
      </p>
    </Card>
  );
};

export default FacultyCard;
