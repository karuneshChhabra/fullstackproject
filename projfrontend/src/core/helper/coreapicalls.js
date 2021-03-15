import { getAllProducts } from "../../admin/helper/adminapicall";
import {API} from "../../backened";


export default getAllProducts= () =>{
   console.log("hello");

   return fetch(`${API}/products`,{
       method:'GET'
   }).then(response=>{
       console.log(response);
   }).catch(err=>
    console.log(err));

}