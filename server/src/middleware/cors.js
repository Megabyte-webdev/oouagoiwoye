const whiteList = ["http://localhost:8020", "http://localhost:5000"];

const corsOption = {
    origin:(origin, cb) => {
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            cb(null, true);
        }else{
            cb(new Error('Not allowed by CORS'));
        }
    }
};

module.exports = {corsOption};