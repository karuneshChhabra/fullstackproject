import {API} from "../../backened";

export const createCategory=(userId,token,category)=>{

    return fetch(`${API}/category/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authoriztion:`Bearer ${token}`
        },
        body:JSON.stringify(category)
        
    }).then(response =>{
        return response.json();
    }).catch(err=>{
        console.log(err);
    })

}