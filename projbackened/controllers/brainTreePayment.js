const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "rnbzkr8hvwr2kj8c",
  publicKey: "pcsc2yc736v3y5hp",
  privateKey: "089b27b5fede1caaeb4d5b9bd96dbf26"
});


exports.getToken = async (req,res)=>{
    console.log("getToken");


      let response=null;
    try{
      response = (await gateway.clientToken.generate({
        
      })).clientToken;

      if(response){
        console.log(response);
         res.send({"data":response})
      }
    }catch(err){
        console.log(err)
    };



}

exports.paymentBGateway= async (req,res)=>{
    console.log("paymentB");
 
    let nonceFromTheClient = req.body.paymentMethodNonce;
    let amountFromTheClient = req.body.amount;
    let result= null;
    try{
     result= (await gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,

        options: {
          submitForSettlement: true
        }
      })).transaction;
      if(result){
          console.log(result);
        return res.send({"data": result})
      }
    }catch(err){
        console.log(err);
    };
      
}