import React, { useEffect, useState } from "react";
import ImageHelper from "./ImageHelper";

import { addItemToCart, removeFromCardList } from "./helper/cardapicalls";
import { Redirect } from "react-router-dom";


const Card =  ({ product,addTocard=true,removeFromCard=false,setReload= f => f,reload=undefined}) => {
    console.log(product);  
    
    const [redirect,serRedirect]=useState(false)


    const addtoCardHandler=product=>event=>{
        event.preventDefault();
        console.log(product);
        console.log("product");
        addItemToCart(product,()=>serRedirect(true));
        
    }

    const redirectToCart = () =>{
       
        if(redirect){
            return <Redirect to="/cart"></Redirect>;
        }
        
       
        
    };

    return (
          <div className="card text-white bg-dark border border-info ">
            <div className="card-header lead">{product.title}</div>
            
            <div className="card-body">
              <ImageHelper product={product} /> 
              {redirectToCart()}
              <p className="lead bg-success font-weight-normal text-wrap">
                {product.description}
              </p>
              <p className="btn btn-success rounded  btn-sm px-4">$ {product.price}</p>
             
              <div className="row">
                {addTocard && (<div className="col-12">
                  <button
                    onClick={addtoCardHandler(product)}
                    className="btn btn-block btn-outline-success mt-2 mb-2"
                  >
                    Add to Cart
                  </button>
                </div>)}
                
                {removeFromCard && (<div className="col-12">
                  <button
                    onClick={()=>{
                        removeFromCardList(product._id);
                        setReload(!reload);
                    }
                    }
                    className="btn btn-block btn-outline-danger mt-2 mb-2"
                  >
                    Remove from cart
                  </button>
                </div>)}
              </div>
            </div>
          </div>
        );
      };


export default Card;