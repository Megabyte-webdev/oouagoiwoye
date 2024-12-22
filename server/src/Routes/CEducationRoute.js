const express = require("express");
const { 
    createProgram, 
    fetchAllPrograms, 
    updateCEdata, 
    updateCEImage, 
    deleteCE } = require("../Controllers/CEducationController");
const { upload } = require("../middleware/multer");

const router = express.Router();


// create a program in continuous education
router.post('/', upload.single("image"), createProgram);

//fetchg all programs
router.get('/', fetchAllPrograms);

// updating continuous education data
router.patch('/data/:id', updateCEdata);

//updat continuing education image
router.patch('/image/:id', upload.single("image"), updateCEImage);

// delete continuious education data
router.delete('/:id', deleteCE);

module.exports = router;