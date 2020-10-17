const User =require("../models/user")
const {validationResult}= require("express-validator")
var expressjwt = require('express-jwt');
var jwt = require('jsonwebtoken');



exports.authfunction=(req,res)=>{
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
