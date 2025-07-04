const express = require('express');
const { upload } = require('../middleware/multer');
const { createMember, fetchAllMembers, updateAdminImage, updateAdminData, updateAdminContact, deleteAdminMember, updateAdminResponsibilities,  } = require('../Controllers/administrationController');
const router = express.Router();

// create
router.post('/',upload.single('image'), createMember);

//fetch 
router.get('/', fetchAllMembers);

// update admin image
router.patch('/image/:id', upload.single('image'), updateAdminImage);

//update admin data
router.patch('/data/:id', updateAdminData);

//update responsibilities
router.patch('/responsibilities/:id', updateAdminResponsibilities)

//update admin contact
router.patch('/contact/:id', updateAdminContact);

//delete admin member
router.delete('/:id', deleteAdminMember);

module.exports = router;