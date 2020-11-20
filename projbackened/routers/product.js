const express= require("express");
const router= express.Router();

const {getProductById,getProduct,createProduct,getAllProducts,updateProduct,deleteProduct,photo}= require("../controllers/product")

const {isAuthenticated,isAdmin,isSignedIn} = require("../controllers/auth")
const {getUserById} = require("../controllers/user")

//params
router.param("userId",getUserById);

router.param("productId",getProductById);



//
router.get("/product/:productId",getProduct);

router.get("/products",getAllProducts);

router.get("/product/photo/:productId",photo);

router.post("/product/create/:userId",isSignedIn, isAuthenticated,isAdmin,createProduct);

router.put("/product/:productId/:userId",isSignedIn, isAuthenticated,isAdmin,updateProduct);

router.delete("/product/:productId/:userId",isSignedIn, isAuthenticated,isAdmin,deleteProduct);




module.exports=router;