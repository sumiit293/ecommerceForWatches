const jwt = require("jsonwebtoken");
const secret = require("./../config/MyUrl").secrect;

module.exports = async (req, res, next) => {

    const token = req.header("user-auth-token");

    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denined" });
    }
    try {
        const decode = await jwt.verify(token, secret);

        req.userId = decode.id;
        next();
    }
    catch (error) {
        console.log(error)
        res.status(401).json({ msg: "Token not valid" });
    }


}