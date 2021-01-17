import "../styles.css";
import {API} from "../backened";
import Base from "./Base";

const Home = () => {
    console.log("API is:"+ API);
    return ( <Base title="Home Page" description="welcome to T shirt store">
       <div className="row">
           <div className="col-4">
               

           </div>

       </div>
    </Base> );
}
 
export default Home;