const jwt = require("jsonwebtoken");

const verifyAdmin = async (req, res, next) => {
    const token = req.cookies?.authToken; 
    if (!token) {
        return res.status(401).json("No Token found")
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_ACCESS_SECRET_TOKEN);

        req.user = verified;
        next()
    } catch (error) {
        next(error);
    }
};

module.exports = {
    verifyAdmin
};