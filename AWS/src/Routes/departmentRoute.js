const express = require('express');
const router = express.Router();
const departmentController = require('../Controllers/departmentController');
const { upload } = require('../middleware/multer');

//fetch all departments
router.get("/", departmentController.findAllDepartments);

//editing department info
router.patch("/data/:id", departmentController.editDepartment);

//editing department image
router.patch("/image/:id", upload.single("image"), departmentController.editDepartmentImage);

//deleting drpartments
router.delete("/:id", upload.single('image'), departmentController.deleteDepartment);

module.exports = router;