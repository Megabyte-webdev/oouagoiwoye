const express = require("express");
const router = express.Router();
const faqsController = require("../Controllers/faqsController");


router.post("/", faqsController.createFaqs);

router.get("/", faqsController.fetchFaqs);

router.get("/:id", faqsController.fetchSingleFaq);

router.patch("/:id", faqsController.updateFaq);

router.delete("/:id", faqsController.deleteFaq);


module.exports = router;