const express= require("express");
const router= express.Router();

const {getProductById,getProduct,createProduct}= require("../controllers/product")

const {isAuthenticated,isAdmin,isSignedIn} = require("../controllers/auth")
const {getUserById} = require("../controllers/user")

//params
router.param("userId",getUserById);

router.param("productId",getProductById);



//
router.get("/product/:productId",getProduct);

router.post("/product/create/:userId",isSignedIn, isAuthenticated,isAdmin,createProduct)



module.exports=router;