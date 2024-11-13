const express = require("express");
const router = express.Router();
const campusController = require("../Controllers/campusController")
const {upload} = require("../middleware/multer");

//create campus
router.post("/", upload.single("image"), campusController.createCampus);

//fetch campus
router.get("/", campusController.fetchCampus);

//updat campus contact
router.patch("/contact/:id", campusController.updateCampusContact);
//updtaing campus image
router.patch("/image/:id", upload.single("image"), campusController.updateCampusImage);

//update campus data
router.patch("/data/:id", campusController.updateCampusData)

//create faculties
router.patch("/faculty/:id", upload.single("image"), campusController.createFaculty)

//delete campus
router.delete("/:id", campusController.deleteCampus)


module.exports = router