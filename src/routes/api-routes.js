const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User.js");
const Review = require("../models/Review.js");
router.use(bodyParser.json())
let JWT_SECRET = process.env.JWT_SECRET;



router.post("/api/login", async (req, res)=>{

    let {nameemail, password} = req.body;

    let user = await User.findOne({nameemail}).lean();

    if (!user){
        return res.json({status: 'error', error: 'Invalid username or password'});
    }

    if (await bcrypt.compare(password, user.password)){

        let token = jwt.sign({id: user._id, nameemail: user.nameemail}, JWT_SECRET);
        
        return res.json({status: 'ok', data: token});
    } 

    return res.json({status: 'error', error: 'Nesprávne meno, email alebo heslo!'});


});

router.post("/api/register", async (req, res)=>{
    let {password: plainTextPassword, nameemail} = req.body;
    


    if (plainTextPassword.length < 8){
        return res.json({status: 'error', error: 'Vaše heslo je moc krátke, malo by obsahovať aspoň 8 symbolov.'})
    }
    
    
    let password = await bcrypt.hash(plainTextPassword, 10)
    let role = 'user';

    try{
        let response = await User.create({
            nameemail,
            password,
            role,

            
        });
        console.log("User created: ", response);
        let token = jwt.sign({id: response._id, nameemail: response.nameemail}, JWT_SECRET);
        
        return res.json({status: 'ok', data: token});
        
    } catch(err){
        console.log("register")
        console.log(JSON.stringify(err));
        if (err.code == 11000){
            res.json({status:'error', error: 'Vaše používateľské meho alebo email sa už používa!'});

        }else{
            //res.sendStatus(400);
            res.json({status:'error'});
        }
    }



    
});


router.post("/api/check-if-admin", async (req, res)=>{
    let {token} = req.body;


    try {
        let user = jwt.verify(token, JWT_SECRET);
        let _id = user.id;
        let dbUser = await User.findOne({_id});
        if (dbUser.role == 'admin'){
            res.json({status: 'ok', data:"admin" });
        } else{
            res.json({status: 'ok', data:"user" });
        }

    } catch(err){
        console.log(err);
        res.json({status: 'error', error: 'Niesi prihlásený!'});
    }
});


router.post("/api/add-review", async (req, res)=>{
    let {name, position, text} = req.body;
    


    try{
        let response = await Review.create({
            name,
            position,
            text,

            
        });
        console.log("Review created: ", response);
        res.json({status:'ok'});
        
    } catch(err){
        console.log(JSON.stringify(err));
        if (err.code == 11000){

        }else{
            res.json({status:'error'});
        }
    }
});

router.get("/api/get-all-reviews", async (req, res)=>{
    


    try{
        let response = await Review.find({});
        console.log("Reviews:", response);
        res.json({status:'ok', data:response});
        
    } catch(err){
        console.log(JSON.stringify(err));
        if (err.code == 11000){

        }else{
            res.json({status:'error'});
        }
    }
});





module.exports = router;

