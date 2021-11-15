const mongoose = require("mongoose");
const sanitizerPlugin = require('mongoose-sanitizer-plugin');

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        phone_number: String,
        firstname: String,
        lastname: String,
        employee_id: String,
        otp: String,
        is_manager: Boolean,
        work_status: {
            type: Boolean,
            default: false
        },
    }, { timestamps: true }).plugin(sanitizerPlugin)
);

module.exports = User;