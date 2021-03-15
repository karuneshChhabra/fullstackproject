import { Link } from "react-router-dom";
import { authenticate, isAuthenticate } from "../auth/helper";


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

    const payNow=()=>{
        console.log("payNow");
        return isAuthenticate()?(<div>
            <button className="btn btn-success">Pay with strip</button>
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