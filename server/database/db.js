const mongoose=require("mongoose");

const connectToMogodb=async()=>{
    await mongoose.connect("mongodb://localhost:27017/food_delivery").
    then(()=>{
        console.log("Mongoose connected successfully !!!");
    }).
    catch((error)=>{
        console.log("Mongoose connection failed !!!",error);
    })
}

module.exports=connectToMogodb;
