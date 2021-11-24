require('dotenv').config()
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const express = require('express');
const cors = require("cors");
const db = require("./app/models");
const migrations = require("./app/migrations/migrations");
const app = express();
const fileUpload = require('express-fileupload');


//enable dotenv
require('dotenv').config()

// give permission for fetch resource
// https://acoshift.me/2019/0004-web-cors.html
// https://stackabuse.com/handling-cors-with-node-js/
const CLIENT_URL_REGEX = new RegExp(process.env.CLIENT_URL)
const DOMAIN_URL_REGEX = new RegExp(process.env.DOMAIN)
const corsOptions = {
    origin: [CLIENT_URL_REGEX, DOMAIN_URL_REGEX],
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.use(cors(corsOptions)); 

// parse requests of content-type - application/json
app.use(bodyParser.json());

// enabled file upload
app.use(fileUpload({}));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/shift.routes")(app);

// set port, listen for requests
const port = process.env.SERVER_PORT
server = app.listen(port, () => console.log("server running on port " + port))

// connect to database
db.mongoose.connect(process.env.DB)
.then(() => {
  console.log("Successfully connect to MongoDB.");
  migrations.initial();
})
.catch(err => {
  console.error("Connection error", err);
  process.exit();
});

module.exports = app;