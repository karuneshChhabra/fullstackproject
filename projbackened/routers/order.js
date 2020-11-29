const express =require("express");
const router= express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById,pushOrderInPurchaseList } = require("../controllers/user");
const {getOrderById,createOrder,updateStatus,getAllOrders ,getOrderStatus}= require("../controllers/order");

const {updateStock}=require("../controllers/product");

router.param("userId",getUserById);

router.param("orderById",getOrderById);

router.post("/order/create/:orderById/:userId", isSignedIn, isAuthenticated, pushOrderInPurchaseList, updateStock, createOrder);

router.put("/update/order/:orderById/status/:userId", isSignedIn, isAuthenticated, isAdmin, updateStatus);


router.get("/order/status/:userId", isSignedIn, isAuthenticated,isAdmin,getOrderStatus)

router.get("/order/all/:userId",isSignedIn,isAuthenticated,isAdmin,getAllOrders)

module.exports=router;