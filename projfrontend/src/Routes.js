import React from "react";
import {BrowserRouter,Switch,Route } from "react-router-dom";
import Home from "./core/Home";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import AdminDashboard from "./user/AdminDashBoard";
import UserDashboard from "./user/UserDashBoard";
import Cart from "./core/Cart";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import AdminRoute from "./auth/helper/AdminRoutes";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import ManageCategories from "./admin/ManageCategories";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import UpdateCategory from "./admin/UpdateCategory";




const Routes=()=>{
    
return(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" exact component={Home} />
            <Route path="/signin" exact component={Signin} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/cart" exact component={Cart} />
            <PrivateRoute path="/user/dashboard" exact component={UserDashboard}/>
            <AdminRoute path="/admin/dashboard" exact component={AdminDashboard}/>
            <AdminRoute path="/admin/create/category" exact component={AddCategory}/>
            <AdminRoute path="/admin/categories" exact component={ManageCategories}/>
            <AdminRoute path="/admin/create/product" exact component={AddProduct}/>
            <AdminRoute path="/admin/products" exact component={ManageProducts}/>
            <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct}/>
            <AdminRoute path="/admin/category/update/:categoryId" exact component={UpdateCategory}/>
        </Switch>
    </BrowserRouter>
);
}

export default Routes;