import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { isAuthenticate } from "../auth/helper";
import Base from "../core/Base";
import { updateCategory, getCategoryById } from "./helper/adminapicall";

const UpdateCategory=({match})=>{
  
    const [values, setValues ]=useState({
          name:"",
          error:false,
          success:true
    }); 
    
    const {user,token} = isAuthenticate();
    
    const updateCategoryForm=()=>(
        <form >
        <span className="text-white m-4">Post photo</span>
        
        </form>

    )

    

    const preload=(categoryId)=>{
        getCategoryById(categoryId).then(response=>{
            if(response.error){
               setValues({...values,error:true})
            }else{
                console.log(response);
                setValues({...values,name:response.name});
            }

        })
    }

    useEffect(()=>{
        console.log(match);
        preload(match.param.categoryId);
    },[])
    

    return (
          <Base title="Update Category" description="Update a Category" className="container bg-success p-4">
            <div className="row bg-success rounded">
                 <div className="mt-5">
                    <Link className="btn btn-sm btn-dark mb-3" to="/admin/dashboard">
                    Admin Home
                    </Link>

                </div>
                <div className="col-md-8 offset-md-2">
                    {updateCategoryForm()}
                </div>
            </div>
          </Base> 
    )


    

}

export default UpdateCategory;