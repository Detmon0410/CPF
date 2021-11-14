const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;

/** Check token by get access token first.
 * Then return the confirm message.
 */
verify_token = async (req, res, next) => {
    try {
        const token = req.cookies.access_token;
        if (!token) {
            return res.status(403).send({message: "No token provided!"});
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decoded.id)
        if (user) {
            req.user = user;
            return next();
        }
        return res.status(403).send({message: "User not found."});
    }
    catch (err) {
        console.log(err)
        return res.status(500).send({message: "internal server error"});
    }
};

is_manager = async (req, res, next) => {
    return next();
    try {
        if (req.user.is_manager === true) {
            return next();
        }
        else {
            res.status(403).send({ message: "Permission Denied"})
        }
    }
    catch (err) {
        return res.status(500).send({message: "internal server error"});
    }
};

const auth = {
    verify_token,
    is_manager,
};

module.exports = auth;
