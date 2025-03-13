const jwt = require('jsonwebtoken');
require('dotenv').config();

const isLogin = (req, res, next) => {
    const token = req.header('authorization').split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Access Denied", success: false });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET,{ algorithms: ["HS256"] });
        req.user = decoded.user;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
}

module.exports = isLogin;