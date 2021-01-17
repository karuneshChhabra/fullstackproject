import Base from "../core/Base"
import {useState} from "react";
import {Link,Redirect} from "react-router-dom";
import {signin,isAuthenticate,authenticate} from "../auth/helper";


const SignIn = () => {
    const [values,setValues]=useState({
        email:"",
        password:"",
        loading:false,
        didRedirect:false,
        error:""

    });

    const {email,password,loading,didRedirect,error}= values;

    const {user}= isAuthenticate();
    const handleChange=name=>event=>{
        setValues({...values,error:false,[name]:event.target.value});
    }
    const onSubmit=event=>{
        event.preventDefault();
        setValues({...values,error:false,loading:true});
        signin({email,password}).then(response=>{
            if(response.error){
                setValues(
                    {...values,error:JSON.stringify(response.error),
                        loading:false}); 
            }else{
                authenticate(response,()=>{            
                    setValues(
                    {...values,error:false,
                        loading:false,
                        didRedirect:true,
                        email:"",
                        password:""
                    }); 
                }) 
            }
        }).catch(error=>{
           console.log(error);
           setValues({...values,error:JSON.stringify(error)}); 
        });
            
        
    }

    const performRedirect=()=>{
      if(didRedirect){
          if(user && user.role==1){

          }else{

          }
          if(isAuthenticate()){
            return(
                <Redirect to="/"></Redirect>
            )
          }
          
      }

    }

        
    const loadingCase=()=>{
        // if(success){
        return ( <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
            <div className="alert alert-success" style={{display:loading?"":"none"}}>
                Loading...<Link to="/signin">Sign In</Link>
            </div>
            </div>
        </div>)
        // }
    }
    
    const failureCase=()=>{
        // if(error!=""){
            return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                        <div className="alert alert-failure" style={{display:error?"":"none"}}>   error:{error}</div>
                </div>
            </div>
            );
        // }
    }

    const signInForm=() =>{
        return(
            <div className="row">
                 {failureCase()} 
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                             <label className="text-light">Email</label>
                             <input value={email} onChange={handleChange("email")} type="email" className="form-control"></input>
                        </div>
                        <div className="form-group">
                             <label className="text-light">Password</label>
                             <input type="password" value={password}  onChange={handleChange("password")} className="form-control"></input>
                        </div>
                        <div className="form-group py-3">
                             <button onClick={onSubmit} className="btn btn-success btn-block" style={{width:"100%" }}>Submit</button>
                        </div>
     
                    </form>
                </div>
            </div>   
        );
     }

    return ( 
    <Base title="Sign In" description="Sign in Page">
      
       {signInForm()}
    </Base>);
}
 
export default SignIn;