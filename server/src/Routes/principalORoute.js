const  express  = require("express");
const { createAPrincipalOfficer, getPrincipalOfficers, updatePrincipalOfficerImage, deletePrincipal, updatePrincipalOData } = require("../Controllers/principalOController");
const { upload } = require("../middleware/multer")

const router = express.Router();

// create principal officer
router.post("/", upload.single("image") , createAPrincipalOfficer);

// get all principal officers
router.get("/", getPrincipalOfficers);

// update principal Officer Data
router.patch("/data/:id", updatePrincipalOData);

//update principal officer image
router.patch("/image/:id" ,upload.single("image"), updatePrincipalOfficerImage);

//delete a principal member
router.delete("/:id", deletePrincipal);


module.exports = router;