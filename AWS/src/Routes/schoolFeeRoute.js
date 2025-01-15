const express = require("express");
const { fetchSchholFee, editSchoolFee, deleteSchoolFee } = require("../Controllers/schoolFeeController");

const router = express.Router();

// Fetching all school fees
router.get('/', fetchSchholFee);

//updating school fee
router.patch('/:id', editSchoolFee);

// delete school fee
router.delete('/:id', deleteSchoolFee);

module.exports = router;