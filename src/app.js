const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();


const User = require("./models/User.js")
const publicDirname = path.join(__dirname, "../public");
const port = process.env.PORT;
const dbURI = process.env.MONGOURI;
let JWT_SECRET = process.env.JWT_SECRET;

app.use(express.static(publicDirname));
app.use(bodyParser.json());
app.use(require("./routes/api-routes.js"));
app.use(require("./routes/routes.js"));


mongoose.connect(dbURI)
    .then((result)=>{console.log("Connected to mongoDB")})
    .then(()=>{app.listen(port);})
    .then(()=>{console.log("Listening on port: "+port);})
    .catch((err) =>{console.log(err)});


