module.exports = function(app) {
    var router = require("express").Router();
    const shiftController = require("../controllers/shift.controller");
    const path = require('path');
    const { auth } = require("../middlewares");
  
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    router.post("/create_shift",
        [auth.verify_token, auth.is_manager],
        shiftController.create_shift
    );

    router.post("/edit_shift",
        [auth.verify_token, auth.is_manager],
        shiftController.edit_shift
    );

    router.post("/assign_employee",
        [auth.verify_token, auth.is_manager],
        shiftController.assign_employee
    );

    router.post("/unassign_employee",
        [auth.verify_token, auth.is_manager],
        shiftController.unassign_employee
    );

    router.post("/get_shift",
        [auth.verify_token, auth.is_manager],
        shiftController.get_shift
    );

    router.post("/add_ot",
        [auth.verify_token, auth.is_manager],
        shiftController.add_ot
    );
  
    app.use('/apis/shift', router);
  };
  