import { Children } from "react";
import Menu from "./Menu";

const Base = ({
    title="My title",description="My Description",
    className="bg-dark text-white p-4",
    children
    })  =>{
    return (
        <div>
            <Menu></Menu>
            <div className="container-fluid">
                <div className="jumbotron text-white text-center">
                    <h2 className="display-4">{title}</h2>
                    <p className="lead">{description}</p>
                </div>
                <div className={className}>{children}</div>
            </div>
            
            <footer className="footer bg-dark mt-auto py-3">
                <div className="container-fluid bg-success text-white text-center">
                    <p>
                        <h4>If you have any question please reach out!</h4>
                        <button className="btn btn-warning btn-lg">Contact Us</button>
                    </p>
                </div>
                <div className="container">
                    <span className="text-muted">
                        An amazing <span className="text-white">MERN</span> boot camp 
                    </span>
                </div>
            </footer>
        </div>

      );
}
 
export default Base;