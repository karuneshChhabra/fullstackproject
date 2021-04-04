const {Order,productcart} = require("../models/order");


var errorMessageHandler=(errorMessage,res)=>{
    return res.status(400).json({
        error:errorMessage
    })
}

exports.createOrder=(req, res)=>{
    req.body.order.user=req.profile;
    let order = new Order(req.body.order);
    order.save((err,order)=>{
      if(err){
        return  errorMessageHandler("order is not placed Successfully");
      }
      return res.json({'data':order});
    });
}


exports.getOrderById=(req,res,next,id)=>{
     Order.findById(id)
     .populate("products.product","name price")
     .exec((err,order)=>{
       if(err){
           return errorMessageHandler("Order not found");
       }
       req.order=order;
       next();
     });

}

exports.getAllOrders=(req,res)=>{
    Order.find()
         .populate("user" ,"_id name")
         .exec((err,orders)=>{
           if(err){
               return errorMessageHandler("No order found")
           }
           return res.json(orders);
         });
}

exports.updateStatus=(req,res)=>{
   Order.update(
       {_id:req.body.orderId},
       {$set:{status:req.body.status}},
       (err,order)=>{
         if(err){
             return errorMessageHandler("Cannot update order status");
         }
         res.json(order);
       }); 

}


exports.getOrderStatus=(req,res)=>{
    res.json(Order.schema.path("status").enum);
}
