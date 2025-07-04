const multer = require('multer');
const path = require('path');
const RandomName = require('../helpers/randomNameGenerator');

function getExt(file) {
    const generate = new RandomName(file)
    return generate.getFullFileName()
};

const storage = multer.diskStorage({
    
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, getExt(file));
    }

})

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