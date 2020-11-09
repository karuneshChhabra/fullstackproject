const express = require('express');
const router = express.Router();

const {getUserById, getUser, getAllUsers,getUserAndUpdate,userPurchaseList} = require('../controllers/user')
const {isSignedIn,isAuthenticated,isAdmin} = require('../controllers/auth')
 
router.param("userId",getUserById);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);

router.put("/user/:userId", isSignedIn, isAuthenticated, getUserAndUpdate);

router.get("order/user/:userId", isSignedIn, isAuthenticated, userPurchaseList);

router.get("/users", getAllUsers);



module.exports=router;
