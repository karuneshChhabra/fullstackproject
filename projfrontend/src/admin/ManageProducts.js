import React,{useState} from "react";
import {Link} from "react-router-dom";
import Base from "../core/Base";

const ManageProducts = () => {

    return(
        <Base className="container bg-success p-4">
            <div className="row bg-success rounded">
                <div className="col-md-8 offset-md-2">
                    Manage Products
                </div>
            </div>
        </Base>
    )


}

export default ManageProducts;