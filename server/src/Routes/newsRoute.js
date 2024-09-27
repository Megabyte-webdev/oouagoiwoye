const express = require('express');
const router = express.Router();
const { upload } = require('../middleware/multer');
const newsController = require("../Controllers/news.controller");

router.post("/", upload.single("image"), newsController.createNews);

router.get("/", newsController.fetchNews)

router.put("/:id", newsController.updateNews);

router.put("/image/:id", upload.single("image"), newsController.updateNewsImage);

router.delete("/:id", newsController.deleteNews)


module.exports = router;