import React,{useState, useEffect} from "react";
import {Link} from "react-router-dom";
import { isAuthenticate } from "../auth/helper";
import Base from "../core/Base";
import { deleteProduct, getAllProducts } from "./helper/adminapicall";

const ManageProducts = () => {

  
    var {user,token}=isAuthenticate();
   
    const [products, setProducts] = useState([]);
    

    const handleChange=name=>event=>{

    };

    const deleteProductFunction =product=> event =>{
     console.log(product);
     deleteProduct(user._id,token,product._id).then(response=>{
      console.log(response);
      if(response.error){
        
      }else{

      }
     }).catch(err=>{
       console.log(err);
     });
    }

  

    const preload=()=>{
        getAllProducts().then(response=>{
          console.log(response);
          setProducts(response);
          
        }).catch(err=>{
            console.log(err);
        })
    }

    useEffect(()=>{
        preload();
    },[])
  
    return(
     
  <Base title="Welcome admin" description="Manage products here">
      <h2 className="mb-4">All products:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Total {products?products.length:0} products</h2>

          {products && products.map((product,index)=>(
        <div className="row text-center mb-2 " key={index}>
        <div className="col-4">
          <h3 className="text-white text-left">{product.title}</h3>
        </div>
        <div className="col-4">
          <Link
            className="btn btn-success"
            to={`/admin/product/update/${product._id}`}
          >
            <span className="">Update</span>
          </Link>
        </div>
        <div className="col-4">
          <button onClick={deleteProductFunction(product)} className="btn btn-danger">
            Delete
          </button>
        </div>
      </div>

      ))
      }
         
        </div>
      </div>
    </Base>
    )


}

export default ManageProducts;