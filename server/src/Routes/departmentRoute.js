const express = require('express');
const router = express.Router();
const departmentController = require('../Controllers/department.controller');
const {upload} = require('../middleware/multer');

//fetch all departments
router.get("/", departmentController.findAllDepartments);

//editing department info
router.patch("/data/:id", departmentController.editDepartment);

//diting department image
router.patch("/image/:id", upload.single("image"), departmentController.editDepartmentImage);

module.exports = router;