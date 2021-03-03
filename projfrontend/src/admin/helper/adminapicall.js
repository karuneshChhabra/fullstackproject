import {API} from "../../backened";

//category Calls

export const getAllCategories=(productId)=>{
    return fetch(`${API}/categories`,{
        method:"GET"    
    }).then(response =>{
        return response.json();
    }).catch(err=>
        console.log(err)
    );
}


export const createCategory=(userId,token,category)=>{

    return fetch(`${API}/category/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(category)      
    }).then(response =>{
        return response.json();
    }).catch(err=>
        console.log(err)
    );

}

export const updateCategory=(userId,token,categoryId,category)=>{
    return fetch(`${API}/category/${categoryId}/${userId}`,{
        method:"PUT",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:category      
    }).then(response =>{
        return response.json();
    }).catch(err=>
        console.log(err)
    );

}

export const deleteCategory=(userId,token,categoryId,category)=>{
    return fetch(`${API}/category/${categoryId}/${userId}`,{
        method:"DELETE",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:category      
    }).then(response =>{
        return response.json();
    }).catch(err=>
        console.log(err)
    );

}


//Product Calls
export const createProduct=(userId,token,product)=>{
    console.log(product);
    return fetch(`${API}/product/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        },
        body:product      
    }).then(response =>{
        return response.json();
    }).catch(err=>
        console.log(err)
    );

}

export const updateProduct=(userId,token,productId,product)=>{
    return fetch(`${API}/product/${productId}/${userId}`,{
        method:"PUT",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:product      
    }).then(response =>{
        return response.json();
    }).catch(err=>
        console.log(err)
    );

}

export const deleteProduct=(userId,token,productId,product)=>{
    return fetch(`${API}/product/${productId}/${userId}`,{
        method:"DELETE",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:product      
    }).then(response =>{
        return response.json();
    }).catch(err=>
        console.log(err)
    );
}

export const getProductById=(productId)=>{
    return fetch(`${API}/product/${productId}`,{
        method:"GET"    
    }).then(response =>{
        return response.json();
    }).catch(err=>
        console.log(err)
    );
}

export const getAllProducts=(productId)=>{
    return fetch(`${API}/products`,{
        method:"GET"    
    }).then(response =>{
        return response.json();
    }).catch(err=>
        console.log(err)
    );
}

