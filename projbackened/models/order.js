const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

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
   status:{
        type:String,
        default:"Recieving",
        enumValues:["Recieving","Dispached","Processing","Delivered","Cancelled"]
   },
   User:{
       type:ObjectId,
       ref :"User"
   }
    
},{timestamps:true})

const Order = mongoose.model("Order",orderSchema)

module.exports={Order, productcart}
