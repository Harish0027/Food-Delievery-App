const express=require("express");
const CartController=require("../controllers/CartController")
const AuthMiddleware=require("../middlewares/AuthMiddleware")


const router=express.Router();

router.post("/add",AuthMiddleware,CartController.addToCart);
router.post("/remove",AuthMiddleware,CartController.removeFromCart);
router.get("/get",AuthMiddleware,CartController.getCart);

module.exports=router;