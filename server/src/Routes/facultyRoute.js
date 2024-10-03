const express = require("express");
const router = express.Router();
const { upload } = require("../middleware/multer");
const facultyController  = require("../Controllers/faculty.controller");

//get all faculty
router.get("/", facultyController.fetchFaculty);

//update faculty data
router.patch("/data/:id", facultyController.updateFaculty);

//update faculty image
router.patch("/image/:id", upload.single("image"), facultyController.updateFacultyImage);

//update dean image
router.patch("/dean/:id", upload.single("deanImage"), facultyController.updateDeanImg);

//update faculty contact
router.patch("/contact/:id", facultyController.UpdateFacultyContact);

//creating faculty lecturers
router.patch("/lecturer/:id", upload.single("image"), facultyController.createFacultyLecturers);

//creating departments
router.patch("/department/:id",upload.single("image"), facultyController.addDepartment )

//delete faculty
router.delete("/:id", facultyController.deleteFaculties)

module.exports = router;