import { Link } from "react-router-dom";
import { authenticate, isAuthenticate } from "../auth/helper";
import  {paymentGateway}  from "./helper/coreapicalls"
import   StripeCheckout   from "react-stripe-checkout";
import { STRIPEPUBLICKEY } from "../backened";
import { bTreePayment, getToken } from "./helper/brainTreeCalls";


const StripCheckout =({products,reload=undefined,setReload=f=>f})=>{
   
    
    const userid =isAuthenticate() && isAuthenticate().user._id;
    const token =isAuthenticate() && isAuthenticate().token;
    

    const totalAmountCount=()=>{
        let amount=0;
        products.map((product)=>{
            amount=amount+product.price;
        });
        return amount;
    }

    const payment = token => {
        console.log(token);
        paymentGateway(token,products).then((response)=>{
               console.log(response);
               console.log(response.receipt_url)
        }).catch(err =>
            console.log(err));

    }

    const payNow=()=>{
        console.log("payNow");
        return isAuthenticate()?(<div>
             <StripeCheckout stripeKey={STRIPEPUBLICKEY} token={payment}
             
             amount={totalAmountCount()*100}
             shippingAddress
             billingAddress>
                 
                
            <button className="btn btn-success">Pay with stripe</button>
            </StripeCheckout>

            <br/>
            <button className="btn btn-success">Pay with BrainTree</button>
        </div>):
        (<Link to="/signin">
            <button className="btn btn-warning">Sign In</button>
        </Link>);
    }

    console.log("StripCheckout");
    return(
        <div>
            
            <h2>Strip checkout price:{totalAmountCount()}</h2>
            
            {payNow()}
          
        </div>
    );
}

export default StripCheckout;