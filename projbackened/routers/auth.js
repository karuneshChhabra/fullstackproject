const express=require('express');
const router=express.Router();
const {check,validationResult}= require("express-validator")


const {authfunction,signin,signup}= require('../controllers/auth')


  

router.get("/signout",authfunction)

router.post("/signin",
signin)

router.post("/signup",[
    check("name","name should be at least 3 char").isLength({min:3}),  
    check('email',"email is required").isEmail(),
    check('password',"password should be at least 8 char").isLength({min:8})
   ],signup)


module.exports=router;

