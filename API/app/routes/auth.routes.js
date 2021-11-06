module.exports = function(app) {
    var router = require("express").Router();
    const authController = require("../controllers/auth.controller");
    const path = require('path');
  
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    router.post("/get_otp",
        authController.get_otp
    );
    router.post("/signin",
        authController.signin
    );
  
    app.use('/apis/auth', router);
  };
  