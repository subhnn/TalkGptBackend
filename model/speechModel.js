const mongoose=require("mongoose")

const speechSchema=new mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"secuirty"
        },
        speech:String
        
    }
)

module.exports=mongoose.model("speech",speechSchema)