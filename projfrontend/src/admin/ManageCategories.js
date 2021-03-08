import React,{useEffect, useState} from "react";
import {Link} from "react-router-dom";
import { isAuthenticate } from "../auth/helper";
import Base from "../core/Base";
import { getAllCategories ,deleteCategory } from "./helper/adminapicall";

const ManageCategories = () => {

    const{user, token} = isAuthenticate();

    const [categories, setCategories]= useState([]);

    const preload = () => {
        getAllCategories().then(response=>{
            console.log(response);
            setCategories(response);       
        }).catch(err=>{
              console.log(err);
        });

    }

    const deleteCategoryFunction=(categoryId)=>{
        console.log(categoryId);
        deleteCategory(user._id,token,categoryId).then(response=>{
            console.log(response);
        })
    }
    

    useEffect(()=>{
        preload();
    },[]);


    return(
        <Base title="Manage Category" className="container bg-success p-4">
            
            <div className="row bg-success rounded">
                <div className="col-md-8 offset-md-2">
                <h2 className="mb-4">All Categories:</h2>
                <Link className="btn btn-info" to={`/admin/dashboard`}>
                    <span className="">Admin Home</span>
                </Link>      
                <div className="row">
                    <div className="col-12">
                    <h2 className="text-center text-white my-3">Total {categories?categories.length:0} categories</h2>

                    {categories && categories.map((category,index)=>(
                    <div className="row text-center mb-2 " key={index}>
                        <div className="col-4">
                            <h3 className="text-white text-left">{category.name}</h3>
                        </div>
                        <div className="col-4">
                        <Link
                            className="btn btn-success"
                            to={`/admin/category/update/${category._id}`}
                        >
                            <span className="">Update</span>
                        </Link>
                    </div>
                    <div className="col-4">
                    <button onClick={()=>deleteCategoryFunction(category._id)} className="btn btn-danger">
                        Delete
                    </button>
                    </div>
                </div>

                    ))
                    }
         
                </div>
                </div>
            </div>
            </div>
        </Base>
    )


}

export default ManageCategories;