import mongoose from "mongoose";
import {ObjectId} from mongoose.Schema;

const productCartSchema= new mongoose.Schema({

    product:{
        type:ObjectId,
        ref:"Product",
    },
    name:String,
    quantity:{
        type:Number,
        required:true,
        default:1

    },
    price:{
        type:Number,
        required:true
    }
})

const productcart=mongoose.model("productcart",productCartSchema)


const orderSchema= new mongoose.Schema({
   products:[productCartSchema],
   transaction_id:{},
   amount:{
       type:Number
   },
   address: String,
   updated: Date,
   User:{
       type:ObjectId,
       ref :"User"
   }
    
},{timestamps:true})

const order=mongoose.model("order",orderSchema)

module.exports={order,productcart}