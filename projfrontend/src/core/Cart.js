import React,{ useEffect, useState } from "react";
import Base from "./Base";
import Card from "./Card";

import {getValuesFromlocalStorage } from "./helper/cardapicalls";
import PaymentB from "./PaymentB";
import StripCheckout from "./StripCheckout";




const Cart =()=>{

    const [products,setProducts] =useState([]);
    const [reload,setReload] = useState(false);
    
    
    
    useEffect(()=>{
        let productsList =getValuesFromlocalStorage();
        setProducts(productsList)
       
    },[reload])

    const payment=token =>{
      console.log(payment);
    }
    

    return(
<Base title="Cart Page" description="Checkout list">
       <div className="row text-center">
       <div className="col-6" > 
         <h2>Chekout list</h2>
          {products && products.map((product,index)=>(               
           
            <Card product={product} key="index" 
                 addTocard={false} 
                
                 removeFromCard={true}
                 reload={reload}
                 setReload={setReload}/>
             
          ))
          }
      </div>   
      <div className="col-6" > 
            <h2><StripCheckout products={products} 
              reload={reload}
              setReload={setReload}/></h2>
            <PaymentB  products={products} setReload={setReload} />
      </div>    

       </div>
    </Base>
    );


}

export default Cart;