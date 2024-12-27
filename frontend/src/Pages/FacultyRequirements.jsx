import React from "react";
import Table from "../Components/Table"; // Import the reusable table component

const FacultyRequirements = ({columns, title, data }) => {
 

  

  return (
    <div className="mx-auto">
      <Table
        columns={columns}
        data={data}
        title={title}
      />
    </div>
  );
};

export default FacultyRequirements;
