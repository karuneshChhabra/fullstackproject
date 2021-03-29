import { API } from "../../backened"

export const getToken=(token,userId)=>{

    
    return fetch(`${API}/getToken/:userId`,{
        method:'GET',
        headers:{
            "Content-Type":"application/json",
            Accept:"application/json",
            Authorization:`Bearer ${token}`

        }
    }).then(response=>{
        console.log(response);
    }).catch(err=> console.log(err));

}

export const bTreePayment = (token,userId,paymentInfo)=>{
   
   
    return fetch(`${API}/BPayment/${userId}`,{
        method:'POST',
        headers:{
            "Content-Type":"application/json",
            Accept:"application/json",
            Authorization:`Bearer ${token}`

        },
        body: JSON.stringify(paymentInfo)
    }).then(response=>{
        console.log(response);
    }).catch(err=> console.log(err));

}