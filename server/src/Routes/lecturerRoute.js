const express = require("express");
const lecturerController = require("../Controllers/lecturerController");
const { upload } = require("../middleware/multer")

const router = express.Router();

//fetch all lecturers
router.get("/", lecturerController.fetchLecturers);

//editing lecturers info
router.patch("/data/:id", lecturerController.editLecturers);

//editing lecturers image
router.patch("/image/:id", upload.single("image"), lecturerController.editLecturerImage);

//deleting lecturers
router.delete("/:id", lecturerController.deleteLecturer);


module.exports = router;