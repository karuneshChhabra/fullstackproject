import React ,{useState, useEffect} from "react";
import {Link} from "react-router-dom";
import { isAuthenticate } from "../auth/helper";
import Base from "../core/Base";
import { createProduct, getAllCategories } from "./helper/adminapicall";





const AddProduct=()=>{
  const {user,token} = isAuthenticate();
  const [values, setValues] = useState({
      title:"",
      description:"",
      price:"",
      stock:"",
      photo:"",
      categories:[],
      category:"",
      error:"",
      loading:false,
      createdProduct:"",
      getRedirect:false,
      formData:""

  });

  const {title,description,stock,price,photo,categories,category,error,loading,createdProduct,getRedirect,formData}=values;

  const onSubmit = event=>{
      event.preventDefault();
      console.log("onsubmit");
      console.log(values);
      console.log(formData);
      setValues({ ...values, error: "", loading: true });

      
      createProduct(user._id,token,formData).then(data=>{
          if(data.error){
            setValues({ ...values, error: data.error });
          }else{
            setValues({
                ...values,
                name: "",
                description: "",
                price: "",
                photo: "",
                stock: "",
                loading: false,
                createdProduct: data.name
              });
          }
          console.log(data);
      }).catch(err=>console.log(err));
  }

  const successCase=()=>(
    createdProduct && (<div className="alert alert-success m-p4">
        {createdProduct } creadted Successfully
    </div>)
  )

  const preload=()=>{
      getAllCategories().then(response=>{
          console.log(response);
          if(response.error){
              setValues({...values,error:true})
          }else{
            setValues({...values,categories:response,formData:new FormData()});
            console.log(categories);
          }
      })
  }


  useEffect(()=>{
    preload();
  },[])

  const handleChange=key=>event=>{
      var value= key==="photo"?event.target.files[0]:event.target.value;
      console.log("name");
      console.log(key);
      var formValue=formData;
      formValue.set(key,value);
      console.log(formValue);
      setValues({...values,[key]:value,formData:formValue}); 
  }


  const createProductForm = () => (
    <form >
      <span className="text-white m-4">Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("title")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={title}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
        <option>Select</option>
         {categories && categories.map((cat,index)=>(
              <option key={index} value={cat._id}>{cat.name}</option> 
         ))}   
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
        />
      </div>
      
      <button type="submit" onClick={onSubmit} className="btn btn-outline-info text-white">
        Create Product
      </button>
    </form>
  );

  const addProductForm=()=>{
      return(
          <form className="form-group">
  
            <p className="lead text-white">Enter a product </p>
            <input type="text"  className="form-control my-3" placeholder="Add a new Product"></input>
            
            <button className="btn btn-outline-info btn-dark text-white">Submit</button>


            

          </form>
      )
  }


  return(
      <Base title="Add Product" description="Create a new  product" className="container bg-success p-4">
        
         <div className="row bg-success rounded">
                 <div className="mt-5">
                    <Link className="btn btn-sm btn-dark mb-3" to="/admin/dashboard">
                    Admin Home
                    </Link>

                </div>
            <div className="col-md-8 offset-md-2">
               {createProductForm()}
               
            </div>
         </div>
      </Base>
  )



}

export default AddProduct;