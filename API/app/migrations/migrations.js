const path = require('path');
const root = path.dirname(require.main.filename);
const db = require("../models");
const fs = require("fs");
const User = db.user;
;
exports.initial = async () => {
    try { 
        const user_count = await User.countDocuments({})
        if (user_count === 0) {
            await new User({
                phone_number: "0983902707",
                firstname: "เดชมนต์",
                lastname: "แจ้งจิตต์",
                employee_id: "0001",
                is_manager: false
            }).save()
            await new User({
                phone_number: "0935461545",
                firstname: "ณัฐกฤตย์",
                lastname: "จตุภัทรดิษฐ์",
                employee_id: "0002",
                is_manager: true
            }).save()
            await new User({
                phone_number: "0123456789",
                firstname: "พาคิน",
                lastname: "เมทีชาญกิจ",
                employee_id: "0003",
                is_manager: false
            }).save()
            await new User({
                phone_number: "0983053559",
                firstname: "กฤษณพงษ์",
                lastname: "รอดแล้วโว้ย",
                employee_id: "0004",
                is_manager: false
            }).save()
            console.log("Simple user created");
        }
    }
    catch (err) {
        console.log(err)
    }
}