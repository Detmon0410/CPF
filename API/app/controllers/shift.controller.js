const sanitize = require('mongo-sanitize');
const db = require("../models");
const moment = require('moment');
const User = db.user;
const Shift = db.shift;
const Assign_ot = db.assign_ot;

exports.create_shift = async (req, res) => {
    try {
        const shift = new Shift({
            title: sanitize(req.body.title),
            start_time: moment(sanitize(req.body.start_time)).format("YYYY-MM-DD HH:mm:ss"),
            end_time: moment(sanitize(req.body.end_time)).format("YYYY-MM-DD HH:mm:ss"),
            manager: req.user,
            shift_count: sanitize(req.body.shift_count),
            shift_hours: sanitize(req.body.shift_hours)
        })
        await shift.save()
        let employee_list = req.body.employee_list
        employee_list = JSON.parse(employee_list)
        employee_list.forEach(async (employee) => {
            const user = await User.findOne({ employee_id: employee })
            const assign_ot = new Assign_ot({
                employee: user,
                shift: shift,
                start_time: moment(sanitize(req.body.start_time)).format("YYYY-MM-DD HH:mm:ss"),
                end_time: moment(sanitize(req.body.end_time)).format("YYYY-MM-DD HH:mm:ss"),
            })
            await assign_ot.save()
        });
        return res.status(200).send({message: "shift created"})
    }
    catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }
}

exports.edit_shift = async (req, res) => {
    try {
        const shift = await Shift.findById(req.body.shift_id)
        console.log(shift)
        if (req.body.title) { shift.title = req.body.title }
        if (req.body.start_time) { shift.start_time = req.body.start_time }
        if (req.body.end_time) { shift.end_time = req.body.end_time }
        if (req.body.shift_count) { shift.shift_count = req.body.shift_count }
        if (req.body.shift_hours) { shift.shift_hours = req.body.shift_hours }
        await shift.save()
        return res.status(200).send({message: "shift edited"})
    }
    catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }
}

exports.assign_employee = async (req, res) => {
    try {
        const shift = await Shift.findById(req.body.shift_id)
        const employee = await User.findOne({ 
            firstname: req.body.firstname,
            lastname: req.body.lastname
        })
        if (employee) {
            const is_duplicated = await Assign_ot.findOne({ 
                shift: shift,
                employee: employee
            })
            if (is_duplicated) {
                return res.status(403).send({message: "employee already assigned to this shift"})
            }
            const assign_ot = new Assign_ot({
                employee: employee,
                shift: shift,
            })
            await assign_ot.save()
            return res.status(200).send({message: "employee assigned"})
        }
        else {
            return res.status(404).send({message: "employee not found"})
        }
    }
    catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }
}

exports.unassign_employee = async (req, res) => {
    try {
        const shift = await Shift.findById(req.body.shift_id)
        const employee = await User.findById(req.body.employee_id)
        await Assign_ot.findOneAndDelete({ 
            shift: shift,
            employee: employee
        })
        return res.status(200).send({message: "delete successfully"})
    }
    catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }
}

exports.get_shift = async (req, res) => {
    try {
        const shift = await Shift.findById(req.body.shift_id)
        const employee_list = await Assign_ot.find({ shift: shift }).populate({path: 'employee', select: ['firstname', 'lastname', 'ot_hours']})
        return res.status(200).send({
            shift: shift,
            employee_list: employee_list
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }
}

exports.add_ot = async (req, res) => {
    try {
        const shift = await Shift.findById(req.body.shift_id)
        const employee = await User.findById(req.body.employee_id)
        const assign_employee = await Assign_ot.findOne({ 
            shift: shift,
            employee: employee
        })
        assign_employee.ot_hours = Number(req.body.ot_hours)
        await assign_employee.save()
        return res.status(200).send({message: "OT hours added"})
    }
    catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }
}

exports.add_time = async (req, res) => {
    try {
        const shift = await Shift.findById(req.body.shift_id)
        const employee = await User.findById(req.body.employee_id)
        const assign_employee = await Assign_ot.findOne({ 
            shift: shift,
            employee: employee
        })
        assign_employee.ot_hours = Number(req.body.ot_hours)
        await assign_employee.save()
        return res.status(200).send({message: "OT hours added"})
    }
    catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }
}