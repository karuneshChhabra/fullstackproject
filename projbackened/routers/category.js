const express = require('express');
const router = express.Router();
const { getCategoryById, getAllCategories, createCategory, updateCategory, deleteCategory, getCategory } = require("../controllers/category");

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

const { getUserById } = require("../controllers/user");

router.param("categoryId" ,getCategoryById);

router.param("userId" ,getUserById);

router.get("/categories", getAllCategories);


router.get("/category/:categoryId", getCategory);


router.post("/category/:userId", isSignedIn, isAuthenticated, isAdmin, createCategory);

router.put("/category/:categoryId/:userId",isSignedIn, isAuthenticated, isAdmin,  updateCategory);

router.delete("/category/:categoryId/:userId",isSignedIn, isAuthenticated, isAdmin, deleteCategory)

module.exports = router;