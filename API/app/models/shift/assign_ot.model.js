const mongoose = require("mongoose");
const sanitizerPlugin = require('mongoose-sanitizer-plugin');

const Assign_ot = mongoose.model(
    "Assign_ot",
    new mongoose.Schema({
        shift: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Shift"
        },
        employee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        start_time: Date,
        end_time: Date,
        enter_time: Date,
        leave_time: Date,
        total_work_hours: Number,
        ot_hours: Number,
    }, { timestamps: true }).plugin(sanitizerPlugin)
);

module.exports = Assign_ot;