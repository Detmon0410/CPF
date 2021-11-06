const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user/user.model")
db.shift = require("./shift/shift.model")
db.assign_ot = require("./shift/assign_ot.model")

module.exports = db;