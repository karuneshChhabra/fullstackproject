import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticate } from "../auth/helper";
import { bTreePayment, getToken } from "./helper/brainTreeCalls";
import { emptyCart } from "./helper/cardapicalls";
import { orderCreated } from "./helper/orderapicalls";

import DropIn from "braintree-web-drop-in-react";


const PaymentB = ({products, setReload=f=>f, reload=undefined}) => {

    
    const [info, setInfo]= useState({
        loading:false,
        success:false,
        error:"",
        clientToken:null,
        instance:{}

        
    });

    useEffect(()=>{
        getmeToken(userId,token)
    },[])

    const userId = isAuthenticate() && isAuthenticate().user._id;
    const token = isAuthenticate() && isAuthenticate().token;


    const totalAmountCount=()=>{
        let amount=0;
        products.map((product)=>{
            amount=amount+product.price;
        });
        return amount;
    }

    const onPurchase =()=>{

        setInfo({...info,loading:true});
        let payment;
        let nonce;
        if(info.instance){
        let getNonce = info.instance.requestPaymentMethod().then(data=>{
            nonce= data.nonce;
            const paymentInfo={
                paymentMethodNonce: nonce,
                "amount":totalAmountCount()
            };
            bTreePayment(token,userId,paymentInfo)
            .then(response=>{
                if(response.id){
                console.log(response);
                console.log("success");
                setInfo({...info,loading:false});
                emptyCart(()=>{
                    const order ={
                        products:products,
                        transaction_id:response.id,
                        amount:response.amount
                       
                        
                    }
                    console.log("empty card");
                   orderCreated(userId,token,order).then(response=>{

                    console.log("order success");
                    console.log(response);

                   }).catch(err=>console.log(err));
                })
                
                setReload(!reload);
                }

            }).catch(err=>{
                console.log(err);
                setInfo({...info,loading:false,error:err});
            })
            
        }).catch(err => console.log(err));
    }
 
    }

    const dropInButton =()=>{
        return ( 
            <div>
           {info.clientToken!= null && products.length>0?(
            <div >
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button className="btn btn-success" onClick={onPurchase}>Pay with BrainTree</button>
          </div>):(<div>
              Please login or add something to the cart
          </div>)}
          </div>)
        
    }

    const getmeToken = (userId,token) => {
        // const info=  getToken(token,userId);
        // console.log(info);
        
         
        getToken(token,userId).then(info=>{
            console.log(info);
            if(info){
            if(info.error){
                setInfo({error:info.error})
            }else{
                const clientToken =info;
                setInfo({clientToken})
            }
        }
        })
        

    }

   




return(
    <div>

<br/>
{dropInButton()}
            
          
    </div>
)


}

export default PaymentB;

