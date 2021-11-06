const sanitize = require('mongo-sanitize');
const db = require("../models");

const User = db.user;

exports.user_detail = async (req, res) => {
    try {
        return res.status(200).send(req.user)
    }
    catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }
}

exports.get_employee_list = async (req, res) => {
    try {
        const users = await User.find({is_manager: {$ne: true}})
        res.status(200).send(users);  
    }
    catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }
}