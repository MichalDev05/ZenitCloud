const express = require("express");
const path = require('path');
const router = express.Router();
const publicDirname = path.join(__dirname, "../../public");


router.get("/", (req, res)=>{
    res.sendFile("html/homePage.html", {root:publicDirname});

});
router.get("/register", (req, res)=>{
    res.sendFile("html/registration.html", {root:publicDirname});

});
router.get("/login", (req, res)=>{
    res.sendFile("html/login.html", {root:publicDirname});

});






module.exports = router;