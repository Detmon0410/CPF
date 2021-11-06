const mongoose = require("mongoose");
const sanitizerPlugin = require('mongoose-sanitizer-plugin');

const Shift = mongoose.model(
    "Shift",
    new mongoose.Schema({
        title: String,
        start_time: Date,
        end_time: Date,
        total_hours: Number,
        shift_count: Number,
        shift_hours: Number,
        manager: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    }, { timestamps: true }).plugin(sanitizerPlugin)
);

module.exports = Shift;