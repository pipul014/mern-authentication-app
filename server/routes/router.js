const express= require("express");
const router= new express.Router();
const userAuthController=require("../controllers/userController")
const authenticate=require("../middleware/authenticate")
router.post("/register",userAuthController.Register);
router.post("/login",userAuthController.Login);

module.exports = router;