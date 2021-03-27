import "../styles.css";
import {API} from "../backened";
import React, { useEffect, useState } from "react";
import Base from "./Base";
import Card from "./Card";

import { getAllProducts } from "../admin/helper/adminapicall";

const Home = () => {
    console.log("API is:"+ API);

    const [values, setValues] = useState([]);
    const [error, setError] = useState(false);

    const preload = () => {
     getAllProducts().then(response=>{
         console.log(response);
         if(response.error){
            setError({error:true});
         }else{
             setValues(response);
         }
     }) 
    }
    useEffect(()=>{
     preload();
    },[])


    return ( <Base title="Home Page" description="welcome to T shirt store">
       <div className="row text-center">
           
          {values && values.map((product,index)=>(
              <div className="col-3" key="index">         
                    <Card product={product}/>
             </div>
          ))
          }  

       </div>
    </Base> );
}
 
export default Home;