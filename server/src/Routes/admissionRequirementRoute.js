const express = require("express");
const { fetchAllRequirement, updateRequirements, deleteRequirement } = require("../Controllers/admissionRequirementController");

const router = express.Router();

// fetching all admission requirements
router.get("/", fetchAllRequirement);

// updateing admission requirements
router.patch("/:id", updateRequirements);

//deleting requirements
router.delete("/:id", deleteRequirement);

module.exports = router;