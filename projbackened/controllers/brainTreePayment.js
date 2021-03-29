const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "useYourMerchantId",
  publicKey: "useYourPublicKey",
  privateKey: "useYourPrivateKey"
});


exports.getToken =(req,res)=>{
    console.log("getToken");
    gateway.clientToken.generate({
        customerId: aCustomerId
      }, (err, response) => {
          if(err){
             return res.status(500).json(err);
          }else{
             return res.json(response)
          }

        // pass clientToken to your front-end
        //const clientToken = response.clientToken;
        //res.send(response.clientToken);
      });

}

exports.paymentBGateway=(req,res)=>{
    console.log("paymentB");
 
    let nonceFromTheClient = req.body.paymentMethodNonce;
    let amountFromTheClient = req.body.amount;
    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,

        options: {
          submitForSettlement: true
        }
      }, (err, result) => {
        if(err){
            return res.status(500).json(err);
         }else{
            return res.json(response)
         }
      });
}