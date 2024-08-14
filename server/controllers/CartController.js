const User=require("../model/UserModel");
const Cart=require("../model/OrderModel");

const CartController={
    addToCart:async(req,res)=>{
       try{
        const id=req.body.userId;
        if(!id){
            return res.json({message:"id not found !!!",success:false});
        }
        const existedUser=await User.findById(id);
        const cartdata=await existedUser.cartData;
        if(!cartdata[req.body.itemId]){
            cartdata[req.body.itemId]=1;
        }else{
            cartdata[req.body.itemId]+=1;
        }
        await User.findByIdAndUpdate(id,{cartData:cartdata});
        res.status(200).json({message:"Added to cart",success:true});
       }catch(error){
        return res.status(500).json({
            message: "Failed to add. Internal error.",
            success: false,
            error: error.message,
          });
       }

    },
    removeFromCart:async(req,res)=>{
        try{
            const id=req.body.userId;
            if(!id){
                return res.json({message:"id not found !!!",success:false});
            }
            const existedUser=await User.findById(id);
            const cartdata=await existedUser.cartData;
            if(cartdata[req.body.itemId]>0){
                cartdata[req.body.itemId]-=1;
            }
            await User.findByIdAndUpdate(id,{cartData:cartdata});
            res.status(200).json({message:"Removed from cart",success:true});
           }catch(error){
            return res.status(500).json({
                message: "Failed to remove. Internal error.",
                success: false,
                error: error.message,
              });
           }

    },
    getCart:async(req,res)=>{
        try{
            const id=req.body.userId;
            if(!id){
                return res.json({message:"id not found !!!",success:false});
            }
            const existedUser=await User.findById(id);
            const cartdata=await existedUser.cartData;
            res.status(200).json({message:"fetched items successfully !!!",success:true,cartdata:cartdata});

        }catch(error){
            return res.status(500).json({
                message: "Failed to Fetch. Internal error.",
                success: false,
                error: error.message,
              });

        }

    }
}
module.exports=CartController;