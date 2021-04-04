import { API } from "../../backened"


export const orderCreated= async (userId,token,order)=>{
   let orderCreate= await fetch(`${API}/order/create/${userId}`,{
     method:"POST",
     headers:{
         "Content-type":"application/json",
         Accept:"application/json",
         Authorization:`Bearer ${token}`
     },
     body:JSON.stringify({order:order})

    }
        
    ).then( response=>{
        console.log(response);

        const values= response.json();
        return values;
        
    }).catch(err=>console.log(err));

    if(orderCreate){
     const data=await orderCreate.data;
     console.log(data);
     return data;
    }
}