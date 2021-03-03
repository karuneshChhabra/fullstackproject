import React, {useState} from "react";
import {Link} from "react-router-dom";
import { isAuthenticate } from "../auth/helper";
import Base from "../core/Base";
import { createCategory } from "./helper/adminapicall";


const AddCategory=()=>{

 const [name,setName] = useState("");
 const [error,setError] = useState(false);
 const [success,setSuccess] = useState(false)

 const {user,token}=isAuthenticate(); 

 const onSubmit=e=>{
     e.preventDefault(); 
    console.log(e);

     console.log(name);
     setSuccess(false);
     createCategory(user._id,token,{name}).then(response=>{
         console.log(response);
         if(response.error){
            setError(response.error);
            setSuccess(false);
         }else{
         
         setSuccess(true);
         setName("");
         }

     }).catch(err=>{
         console.log(err);
         setError(JSON.stringify(err));
         setSuccess(false);

     })

 }

 const errorCase=()=>{
   return (
         error && (<div className="alert alert-info">
           {error}
        </div>)

   );

 }


 const successCase=()=>{
    return (
          success && (<div className="alert alert-info">
            Category Added Successfully.
         </div>)
 
    );
 
  }

 const handleChange=e=>{
    console.log(e);
    e.preventDefault();
    setError("");
   // var name=e.target.value;
    setName(e.target.value);
 }
 
 const addCategoryForm=()=>{

    return(
        <form>
            {successCase()}
            {errorCase()}
            <div className="form-group">
                
                <p className="lead text-white">Enter Category</p></div>
            <input className="form-control my-3" type="text"
            autoFocus
            value={name}
            onChange={handleChange}
            required
            placeholder="For Ex Summer"
            />
            <button className="btn btn-outline-info btn-dark text-white" onClick={onSubmit}>Create Category</button>
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