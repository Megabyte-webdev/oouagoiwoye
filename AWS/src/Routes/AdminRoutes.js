const express = require("express");
const { createAdminAccount, loginAdmin, fetchAllAdmins, updateAdminDetails, deleteAdminDetails } = require("../Controllers/adminController");
const { verifyAdmin } = require("../helpers/verifyAdmin");
const router = express.Router();

// create admin account
router.post('/signup', createAdminAccount);

//login to admin route
router.post('/login', loginAdmin);

//fetch all admin account
router.get('/', fetchAllAdmins);

//update Admin account
router.patch('/:id', updateAdminDetails);

//delete admin contact
router.delete('/:id', deleteAdminDetails);

module.exports = router;