const mongoose=require("mongoose");


const OrdeerSchema=new mongoose.Schema({
     userId:{
        type:String,
        required:true
     },
     items:{
        type:Array,
        required:true

     },
     address:{
        type:Object,
        required:true

     },
     amount:{
        type:Number,
        required:true
     },
     status:{
        type:String,
        default:"Food Processing"
     },
     date:{
        type:Date,
        default:Date.now()
     },
     payment:{
        type:Boolean,
        default:false
     }
})

module.exports=mongoose.model("Order",OrdeerSchema);