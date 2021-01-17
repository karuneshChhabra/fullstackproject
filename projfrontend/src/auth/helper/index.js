import {API} from "../../backened";

export const signin = user =>{
  return fetch(`${API}/signin`,{
      method:"POST",
      headers:{
          accept:"application/json",
          "Content-Type":"application/json"
      },
      body:JSON.stringify(user)
    }
  ).then(response=>{
  return response.json();
  }).catch(error=>{
      console.log(error);
      return error;
  })
}


export const signup =user=>{
    return fetch(`${API}/signup`,{
       method:"POST",
       headers:{
           accept:"application/json",
           "Content-type":"application/json"
       },
       body:JSON.stringify(user)

    }).then(response=>{
        return response.json();
    }).catch(error=>{
        console.log(error);
        return error;
    })
}


export const authenticate=(data,next)=>{
    if( typeof window !='undefined'){
        localStorage.setItem("jwt",JSON.stringify(data));
        next();
    }

    console.log("authenticate");
}

export const signout=next=>{
    if(typeof window !="undefined"){
        localStorage.removeItem("jwt");
        next();

        return fetch(`${API}/signout`,{
             method:"POST",
             headers:{
                 accept:"application/json",
                 "Content-Type":"application/json"
             }
        }).then(response=>{
               return console.log("signout successful");
        }).catch(error=>{
            return console.log(error);
        })
    }
}

export const isAuthenticate=next=>{
    if(typeof window ==undefined){
        return false;
    }
    if(localStorage.getItem("jwt")){
      return JSON.parse(localStorage.getItem("jwt"));
    }else{
        return false;
    }
}