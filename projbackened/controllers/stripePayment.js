
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)
const {v4} = require("uuid");

exports.makePayment =(req,res) =>{
    const {token, products}=req.body;
   

    const idempotencyKey = v4();

    let amount=0;
    const totalAmountCount=()=>{
        
        products.map((product)=>{
            amount=amount+product.price;
        });
        return amount;
    }
    totalAmountCount();


    return stripe.customers.create({
        "email":token.email,
        "source":token.id
    }).then(customer=>{
    
        
         stripe.charges.create({
            amount:amount*100,
            currency:"usd",
            customer:customer.id,
            description:"Selling T shirt",
            receipt_email:token.email,
            shipping:{
                name:token.card.name
            }
            

        
        },{idempotencyKey}).then(response=>{
            console.log(response);
            return res.status(200).json({"data":response});
        }).catch(err=>
            console.log(err))
    }).catch(err=>{
        console.log(err);
    })



}