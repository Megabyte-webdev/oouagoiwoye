const multer = require('multer');
const path = require('path');

const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/svg+xml") {
            cb(null, true);
        } else if (file.mimetype == "video/mp4" || file.mimetype == "video/avi" ) {
            cb(null, true);
        }else{
            cb(null, false);
            return cb(new Error('Only .png, .jpg, .jpeg, .svg, and .mp4 format allowed!'));
        }
    }
});

module.exports = {upload};