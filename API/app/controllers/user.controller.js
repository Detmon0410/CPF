const sanitize = require('mongo-sanitize');
const db = require("../models");
const moment = require('moment');
const Assign_ot = db.assign_ot;

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

exports.enter_work_time = async (req, res) => {
    try {
        console.log(typeof req.user)
        const start_time = moment(sanitize(req.body.start_time), "YYYY-MM-DD HH:mm:ss")
        const end_time = moment(sanitize(req.body.end_time), "YYYY-MM-DD HH:mm:ss")
        const work = await Assign_ot.findOne({ 
            employee: req.user,
            $or: [ 
                {
                    start_time: 
                    {
                        $gte: start_time, 
                        $lt: end_time
                    }
                }, 
                {
                    end_time: 
                    {
                    $gte: start_time, 
                    $lt: end_time
                    }
                }
            ]
            
        })
        if(!work) {
            return res.status(404).send({message: "job not found"})
        }
        if (work.enter_time) {
            return res.status(403).send({message: "already enter time"})
        }
        var duration = moment.duration(end_time.diff(start_time)).asHours();
        work.total_work_hours = duration
        work.enter_time = start_time
        work.leave_time = end_time
        await work.save()
        return res.status(200).send({message: "enter time successfully"})
    }
    catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }
}