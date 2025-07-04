const express = require("express");
const { createDirectorateMember, FetchDirectorates, updateDirectoratesImage, updateDirectoratesData, deleteDirectoratesData } = require("../Controllers/DirectoratesController");
const { upload } = require("../middleware/multer")

const router = express.Router();

// create directorates
router.post('/', upload.single("image"), createDirectorateMember);

// fetch all directorates data
router.get('/', FetchDirectorates);

// update directorates image
router.patch('/image/:id',upload.single("image") , updateDirectoratesImage);

// update directorates data
router.patch('/data/:id', updateDirectoratesData);

// delete directorates data
router.delete('/:id', deleteDirectoratesData);

module.exports = router;