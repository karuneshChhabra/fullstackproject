const User =require("../models/user")
const {validationResult, check}= require("express-validator")
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
const user = require("../models/user");



exports.signOut=(req,res)=>{
    console.log(req);
    res.clearCookie("token");
    res.json({
        message:"user signout"
    })
};


exports.signin=(req,res)=>{
    const error= validationResult(req);
    if (!error.isEmpty()){
      return res.status(422).json({
          error:error.array()
      })

    }

    const {email,password} = req.body;

    User.findOne({email},(err,user)=>{
       
      if(err || !user){
          return res.status(400).json({
              message:"User email doesn't exist"
          })
      }
    
    if (!user.authenticate(password)){
        return res.status(400).json({
            message:"Email and password does not match"
        })
    }


    //create token
    var token = jwt.sign({ _id: user._id }, process.env.SECRET);

    //add token here
    res.cookie("token",token,{expire:new Date()+9999});

    //send response to front end
    const {_id, name, role}= user;
    
    return res.status(200).json({token,user:{_id,name,email,role}});
});
}

//custom middleware
exports.isAdmin=(req,res,next)=>{
if(req.profile.role===0){
    return res.status(403).json({
        error:"You are not ADMIN, ACCESS  DENIED"
    })
}
next();
};

//custom middleware
exports.isAuthenticated=(req,res,next)=>{
 let checker= req.profile && req.auth && req.profile._id===req.auth._id;
 if(!checker){
     return res.status(403).json({
         error:"ACCESS  DENIED"
     })
 }
 next();   
}



exports.signup=(req,res)=>{
    const error= validationResult(req);
    if (!error.isEmpty()){
      return res.status(422).json({
          error:error.array()
      })

    }
   


    const user=new User(req.body);

    user.save((err,user)=>{
       if(err){
           console.log(err)
           return res.status(400).json({
               err:"Not able to save"
           })
       }
       return res.status(200).json({
           name:user.name,
           lastName:user.lastName,
           id:user._id
       }) 
    

    })


   
}

//protected router (checker for token)
exports.isSignedIn= expressJwt({
    secret:process.env.SECRET,
    userProperty:"auth",
    algorithms: ['HS256']
});
