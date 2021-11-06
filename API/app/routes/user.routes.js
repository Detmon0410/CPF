module.exports = function(app) {
    var router = require("express").Router();
    const userController = require("../controllers/user.controller");
    const path = require('path');
    const { auth } = require("../middlewares");
  
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    router.get("/user_detail",
        auth.verify_token,
        userController.user_detail
    );

    router.get("/get_employee_list",
        [auth.verify_token, auth.is_manager],
        userController.get_employee_list
    );
  
    app.use('/apis/user', router);
  };
  