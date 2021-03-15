import { API } from "../../backened"


export const orderCreated=(userId,token,orderById,order)=>{
    return fetch(`${API}/order/create/${orderById}/${userId}`,{
     method:"POST",
     headers:{
         "Content-type":"application/json",
         Accept:"application/json",
         Authorization:`Bearer ${token}`
     },
     body:JSON.stringify(order)

    }
        
    ).then(response=>{
        console.log(response);
        
    }).catch(err=>console.log(err));
}