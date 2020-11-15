const  mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;


const productSchema= new mongoose.Schema({
   title:{
       type:String,
       unique:true,
       required:true,
       maxlength:32,
       trim:true
   },
   description:{
    type:String,
    unique:true,
    maxlength:2000,
    trim:true 
   },
   price:{
       type:Number,
       maxlength:32,
       trim:true,
       required:true
   },
   category:{
    type:ObjectId,
    ref:"Category",
    required:true,
   },
   stock:{
       type:Number
   },
   sold:{
       type:Number,
       default:0
   },
   photo:{
       type:Buffer,
       contentType:String
   }

},{timestamps:true});


module.exports= mongoose.model("Product",productSchema);
