import { API } from "../../backened"

export const createProduct=(userId, token ,product)=>{

    return fetch(`${API}/product/create/:userId`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            Accept:"application/json",
            Authorization:"Bearer ${token}"
        },
        body:JSON.stringify(product)
    }).then(response =>{
        console.log(response);
    }).catch(err=>console.log(err));
}