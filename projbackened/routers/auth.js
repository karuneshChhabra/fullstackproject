const express=require('express');
const router=express.Router();


const {authfunction}= require('../controllers/auth')


  

router.get("/signout",authfunction)


module.exports=router;

