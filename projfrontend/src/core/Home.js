import "../styles.css";
import {API} from "../backened";
import Base from "./Base";

const Home = () => {
    console.log("API is:"+ API);
    return ( <Base title="Home Page">
        <h1 className="text-white">Hello Front End</h1>
    </Base> );
}
 
export default Home;