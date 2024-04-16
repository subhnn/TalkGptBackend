const mongoose=require("mongoose")

const securitySchema=new mongoose.Schema(
    {
        name:String,
        phno:String,
        email:String,
        password:String
    }
)

module.exports=mongoose.model("secuirty",securitySchema)