import React,{useState} from "react";
import {Link} from "react-router-dom";
import Base from "../core/Base";

const ManageCategories = () => {

    return(
        <Base title="Manage Category" className="container bg-success p-4">
            <div className="row bg-success rounded">
                <div className="col-md-8 offset-md-2">
                    Manage Categories
                </div>
            </div>
        </Base>
    )


}

export default ManageCategories;