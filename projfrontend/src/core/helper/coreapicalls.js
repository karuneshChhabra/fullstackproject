import {API} from "../../backened";


export const getAllProducts= () =>{
  

   return fetch(`${API}/products`,{
       method:'GET'
   }).then(response=>{
       console.log(response);
   }).catch(err=>
    console.log(err));

}

export const paymentGateway = (token, products) =>{
    console.log("payment");

    return fetch(`${API}/payment`,{
        method:'POST',
        headers:{
            "Content-Type":"application/json"
            
        },
        body: JSON.stringify({token,products})
    }).then(response =>{
        console.log(response);
        if(response){
        return response;
        }
    }).catch(err=>{
        console.log(err);
    }) ;

}