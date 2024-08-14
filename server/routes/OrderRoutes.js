const express=require("express");
const OrderController=require("../controllers/OrderController")
const AuthMiddleware=require("../middlewares/AuthMiddleware")

const router=express.Router();

router.post("/place",AuthMiddleware,OrderController.placeorder);
router.post("/verify",OrderController.verifyOrder);
router.get("/myorders",AuthMiddleware,OrderController.userOrders);
router.get("/list",OrderController.listOrders);
router.post("/status/:id",OrderController.updateStatus);

module.exports=router;