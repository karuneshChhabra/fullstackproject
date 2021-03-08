import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { isAuthenticate } from "../auth/helper";
import Base from "../core/Base";
import { getProductById, updateProduct ,getAllCategories } from "./helper/adminapicall";

const UpdateProduct =(props)=>{

    //console.log(productId);
   
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

    const handleChange=key=>event=>{
        var value= key==="photo"?event.target.files[0]:event.target.value;
        
        var formValue=formData;
        formValue.set(key,value);
        
        setValues({...values,[key]:value,formData:formValue}); 
    }

    const onSubmit = event=>{
        event.preventDefault();
        console.log("onsubmit");
        console.log(values);
        console.log(formData);
        setValues({ ...values, error: "", loading: true });
        /*var formValue=formData;
        formValue.set("title",title);
        formValue.set("price",price);
        formValue.set("stock",stock);
        formValue.set("description",description);
        formValue.set("category",category);
        setValues({...values,formData:formValue});
        console.log(formData);
        */
        
        
        
        updateProduct( user._id,token, productId,formData).then(data=>{
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
  
  
    const {title,description,stock,price,photo,categories,category,error,loading,createdProduct,getRedirect,formData}=values;
  
    const productId=props.match.params.productId;

     const {user, token} = isAuthenticate();

    const preload=()=>{
         preloadCategories();
         
         
    }

    useEffect(()=>{
        preload();  
    },[])

    const preloadCategories=()=>{
        getAllCategories().then(responseCategories=>{
            console.log(responseCategories);
            if(responseCategories.error){
                setValues({...values,error:true})
            }else{
              setValues({...values,categories:responseCategories,formData:new FormData()});
              var categories=responseCategories;
              getProductById(productId).then(response=>{
                console.log(response);
                setValues({
                   ...values, 
                   title:response.title,
                   description:response.title,
                   price:response.price,
                   stock:response.stock,
                   photo:response.photo,
                   getRedirect:true,
                   formData:new FormData(),
                   categories:categories,
                   category:response.category,
                   
               
                })

                console.log(formData);
                var formValue=formData;
               
              

            }).catch(err=>{
                console.log(err);
            });
            console.log(JSON.stringify(categories));
            console.log(categories);
           
             
            }
        })
    }


    const updateProductForm = () => (
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
              value={category}
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
            Update Product
          </button>
        </form>
      );

    return (<Base title="Update Product"  description="Update a product" className="container bg-success p-4">
          <div className="row bg-success rounded">
                 <div className="mt-5">
                    <Link className="btn btn-sm btn-dark mb-3" to="/admin/dashboard">
                    Admin Home
                    </Link>

                </div>
            <div className="col-md-8 offset-md-2">
               {updateProductForm()}
               
            </div>
         </div>
    </Base>)

}

export default UpdateProduct;