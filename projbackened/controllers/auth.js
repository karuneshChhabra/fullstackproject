const User =require("../models/user")
const {validationResult}= require("express-validator")



exports.authfunction=(req,res)=>{
    res.json({
        message:"user signout"
    })
};


exports.signin=(req,res)=>{
    res.json({
        message:"signin successful"
    })
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
