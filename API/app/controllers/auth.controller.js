const accountSid = "AC556dba57bde3a015e130ac1331690903";
const twilioApiKey = 'SKaec20d1ba6ea4a45407e0bb9ac9daeeb';
const twilioApiSecret = 'Jg5tzjYLjWAPA6Sjwb7sefbFDWw1IJ3h';
const Twilio = require("twilio");
const client = new Twilio(twilioApiKey, twilioApiSecret, {accountSid: accountSid}); 
const jwt = require("jsonwebtoken");
const sanitize = require('mongo-sanitize');
const db = require("../models");

const User = db.user;

exports.get_otp = async (req, res) => {
    try {
        const phone_number = sanitize(req.body.phone_number);
        let phone_number_countrycode;
        if (phone_number.charAt(0) === "0") {
            phone_number_countrycode = "+66" + phone_number.slice(1);
        }
        const user = await User.findOne({ phone_number: phone_number })
        if (user) {
            const otp = Math.floor(100000 + Math.random() * 900000)
            user.otp = otp
            await user.save()
            const ref = (Math.random() + 1).toString(36).substring(7).toUpperCase();
            await client.messages.create({
                body: 'ใช้ <OTP ' + user.otp + ">, <Ref. " + ref + "> เพื่อยืนยันการเข้าใช้งานระบบจัดการการทำงานล่วงเวลา CPF",
                from: '+12058093595',
                to: phone_number_countrycode
            })
            return res.status(200).send({
                phone_number: phone_number_countrycode,
                ref: ref
            })
        }
        else {
            return res.status(400).send({ message: "User not found" });
        }
    }
    catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }
}

exports.signin = async (req, res) => {
    try {
        const phone_number = sanitize(req.body.phone_number);
        let phone_number_countrycode;
        if (phone_number.charAt(0) === "0") {
            phone_number_countrycode = "+66" + phone_number.slice(1);
        }
        const user = await User.findOne({ phone_number: phone_number })
        if (user) {
            if (user.otp == req.body.otp) {
                user.otp = undefined;
                await user.save()
                const access_token = jwt.sign({id: user.id}, process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: process.env.ACCESS_TOKEN_LIFE
                });
                res.cookie('access_token', access_token, {
                    maxAge: process.env.ACCESS_TOKEN_LIFE,
                    httpOnly: false,
                    secure: false
                });
                return res.status(200).send({
                    employee_id: user.employee_id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    is_manager: user.is_manager
                });
            }
            else {
                return res.status(400).send({ message: "otp expired" });
            }
        }
        else {
            return res.status(400).send({ message: "User not found" });
        }
    }
    catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }
}