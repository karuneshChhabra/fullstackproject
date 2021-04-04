import { API } from "../../backened"

export const getToken= async (token,userId)=>{

    
    const response =  (await fetch(`${API}/getToken/${userId}`,{
        method:'GET',
        headers:{
            Authorization:`Bearer ${token}`

        }
    }).then(res=>{
        console.log(res);
        const values=  res.json();
        console.log(values);
        return values;
    }));

    console.log(response);

    const clientToken = await response.data;
    console.log(clientToken);


    
       //const values=await response.data ;
      // console.log(values);
        return clientToken;
    


}

export const bTreePayment = async (token,userId,paymentInfo)=>{
   
   
    const transactionResponse= (await fetch(`${API}/BPayment/${userId}`,{
        method:'POST',
        headers:{
            "Content-Type":"application/json",
            Accept:"application/json",
            Authorization:`Bearer ${token}`

        },
        body: JSON.stringify(paymentInfo)
    }).then(response=>{
        var values=response.json();
        
        console.log(values);
        return values;
       
    }).catch(err=> console.log(err)));
    
    console.log(transactionResponse);
    const transaction= await transactionResponse.data;
    console.log(transaction);
    return transaction;

}