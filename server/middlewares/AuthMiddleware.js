const jwt =require("jsonwebtoken");
const secreteKey = process.env.JWT_SECRET_KEY||"JWT#KEY" ;

const AuthMiddleware=async(req,res,next)=>{
     const token=req.headers.authorization;
     if(!token){
        return res.json({message:"Token not found !!!",success:false});
     }
     try{
        const decode=jwt.verify(token,secreteKey);
        req.body.userId=decode.user;
        next();
     }catch(error){
        return res.status(500).json({message:"Internal server error",error:error});
     }
}

module.exports=AuthMiddleware;