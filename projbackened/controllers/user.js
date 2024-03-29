const User =require("../models/user")
const Order =require("../models/order")

exports.getUserById=(req,res,next,userId)=>{

    User.findById(userId).exec((err,user)=>{
       if(err || !user){
           return res.status(400).json({
               error:'No User found'
           })
       }

       req.profile=user;
     
       next();
    });

}


exports.getAllUsers=(req,res)=>{

    User.find().exec((err,users)=>{
       if(err || !users){
           return res.status(400).json({
               error:'No User found'
           })
       }

       res.json(users);
       
    });

}

exports.getUser=(req,res)=>{
    //get back here for password
    // we should not show these information, so need to reset it.
    req.profile.salt=undefined,
    req.profile.encry_password=undefined;
    req.profile.createdAt=undefined;
    req.profile.updatedAt=undefined;
    return res.json(req.profile);

};

exports.getUserAndUpdate=(req,res)=>{

    User.findByIdAndUpdate({_id : req.profile._id},
        {$set:req.body},
        {new: true, useFindAndModify: false},

            (err, user)=>{
                if (err){
                    return res.status(400).json({
                        error:"You are not authorized to update this user"
                    });
                }
                
                user.salt=undefined,
                user.encry_password=undefined;
                user.updatedAt=undefined;

                return res.json(user);
            }
        )

};


exports.userPurchaseList=(req,res)=>{
     Order.find({user:req.profile._id})
      .populate("user","_id name").exec((err,order)=>{
         if(err){
             return res.status(400).json({
                 error:"No order in this account"
             })
         }

         return res.json(order);

     })
}

exports.pushOrderInPurchaseList=(req,res,next)=>{
      let purchases=[];
      req.body.order.products.forEach(product => {
 

       purchases.push({
           _id: product._id,
           name:product.title,
           description:product.description,
           category:product.category,
           quantity:product.quantity,
           amount:req.body.order.amount,
           transaction_id:req.body.order.transaction_id
       });

      });

      //store this in db

      User.findOneAndUpdate(
          {_id:req.profile._id},
          {$push:{purchases:purchases}},
          {new:true,useFindAndModify:false},
          (err, purchases)=>{
              if(err){
                  return res.status(400).json({
                      error:"unable to save purchase list"
                  })
              }
              next();
          }
      )
      

}