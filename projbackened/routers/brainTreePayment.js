const express = require("express");

const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getToken, paymentBGateway } = require("../controllers/brainTreePayment");
const { getUserById } = require("../controllers/user");

const router= express.Router();

router.param("userId",getUserById);

router.get("/getToken/:userId", isSignedIn, isAuthenticated, getToken);

router.post("/BPayment/:userId", isSignedIn, isAuthenticated, paymentBGateway);


module.exports = router;