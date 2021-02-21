import React, {useState} from "react";
import {Link} from "react-router-dom";
import { isAuthenticate } from "../auth/helper";
import Base from "../core/Base";


const AddCategory=()=>{

 const {name,setName} = useState("initialState")
 const {errror,setError} = useState(false);
 const {success,setSuccess} = useState(false)

 const {user,token}=isAuthenticate(); 
 
 const addCategoryForm=()=>{

    return(
        <form>

            <div className="form-group">
                
                <p className="lead text-white">Enter Category</p></div>
            <input className="form-control my-3" type="text"
            autoFocus
            required
            placeholder="For Ex Summer"
            />
            <button className="btn btn-outline-info btn-dark text-white">Create Category</button>
        </form>
    )
 }

 const backButton=()=>(
     <div className="mt-5">
         <Link className="btn btn-sm btn-dark mb-3" to="/admin/dashboard">
           Back Button
         </Link>

     </div>
 )
  
    
 return(
     <Base title="Add Category" description="Add a new Category for tshirts" className="container bg-success p-4"> 
       <div className="row bg-success rounded">
          <div className="col-md-8 offset-md-2">
          {addCategoryForm()}
          {backButton()}
          </div>
       </div>
     </Base>
 )


}

export default AddCategory;