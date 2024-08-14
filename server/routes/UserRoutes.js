const express=require("express");
const userController=require("../controllers/UserController");

const router=express.Router();

router.post("/login",userController.userLogin);
router.post("/register",userController.userRegister);


module.exports=router;