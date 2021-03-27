const express=require('express');
const router=express.Router();
const {check,validationResult}= require("express-validator")


const {signOut, signin, signup, isSignedIn, isAdmin}= require('../controllers/auth')
  

router.post("/signout", signOut)

router.post("/signin",[ 
    check('email',"email is required").isEmail(),
    check('password',"password is required").isLength({min:1})],
signin)

router.post("/signup",[
    check("name","name should be at least 3 char").isLength({min:3}),  
    check('email',"email is required").isEmail(),
    check('password',"password should be at least 8 char").isLength({min:8})
   ],signup
)

router.post("/isAdmin", isAdmin)


router.get("/testroute", isSignedIn, (req,res)=>{
    res.json(req.auth);

})


module.exports=router;

