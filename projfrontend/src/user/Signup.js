import Base from "../core/Base";
import {Link} from "react-router-dom";
import {useState} from "react";
import { signin,signup } from "../auth/helper";

const SignUp = () => {
 const [values,setValues]=useState({
   name:"",
   email:"",
   password:"",
   error:"",
   success:false

 });
 const {name,email,password,error,success}=values;


const handleChange=name=>event=>{
    setValues({...values,error:false,[name]:event.target.value});
} 

const onSubmit=event=>{
    event.preventDefault();
    console.log("onsubmit");

    setValues({...values,
        error:false
       
    });
    signup({name,email,password}).then(response=>{
        if(response.error){
            setValues({...values,
                error:JSON.stringify(response.error),
                success:false
            });
        }else{
            setValues({...values,
                error:"",
                name:"",
                email:"",
                password:"",
                success:true
            });
           
        }

    }).catch(error=>{
        console.log(error);
        setValues({...values,
            error:JSON.stringify(error[0].msg),
            success:false
        });
    });

}

const successCase=()=>{
    return ( <div className="row">
    <div className="col-md-6 offset-sm-3 text-left">
        <div className="alert alert-success" style={{display:success?"":"none"}}>
            Sign up successfully Login to<Link to="/signin">Sign In</Link>
        </div>
        </div>
    </div>)
}

const failureCase=()=>{
       return(
        <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-failure" style={{display:error?"":"none"}}>   error:{error}</div>
            </div>
        </div>
          );
}






const signUpForm=() =>{
   return(
       <div className="row">
           {successCase()}
           {failureCase()}
           <div className="col-md-6 offset-sm-3 text-left">
               <form>
                   <div className="form-group">
                        <label className="text-light">Name</label>
                        <input type="text" className="form-control"
                        onChange={handleChange('name')}
                        value={name}
                        ></input>
                   </div>
                   <div className="form-group">
                        <label className="text-light">Email</label>
                        <input type="email" className="form-control"
                         onChange={handleChange('email')}
                        value={email}></input>
                   </div>
                   <div className="form-group">
                        <label className="text-light">Password</label>
                        <input type="password" className="form-control"
                        onChange={handleChange('password')}
                        value={password}></input>
                   </div>
                   <div className="form-group py-3">
                   <button className="btn btn-success btn-block " 
                    onClick={onSubmit}
                   style={{width:"100%" }}>Submit</button>
                    </div>
               </form>
           </div>
       </div>   
   );
}
    return ( 
    <Base title="Sign Up" description="Sign up Page"> 
           {signUpForm()}
    </Base>
    );
}
 
export default SignUp;