const express=require("express")

const router=express.Router()
const speechModel=require("../model/speechModel")
const securityModel=require("../model/securitymodel")
const bcrypt=require("bcryptjs")

hashPasswordGenerator=async(pass)=>{
    const salt=await bcrypt.genSalt(10)
    return bcrypt.hash(pass,salt)
}

//add api

router.post("/add",async(req,res)=>{

    let {data}={"data":req.body}
    let password=req.body.password

    const hashPassword=await hashPasswordGenerator(password)
    data.password=hashPassword
    let secuirtyUser=new securityModel(data)
    let result=await secuirtyUser.save()
    res.json({
        status:"success"
    })

})

//login api

router.post("/login",async(req,res)=>{
    let input=req.body
    let email=req.body.email
    let data=await securityModel.findOne({"email":email})
    if(!data)
    {
        return res.json({status:"invalid email"})
    }
    console.log(data)
    let dbPassword=data.password
    let inputPassword=req.body.password
    console.log(dbPassword)
    console.log(inputPassword)
    const match=await bcrypt.compare(inputPassword,dbPassword)
    if(!match)
    {
        return res.json({status : "invalid password"})
    }
    res.json({
        status : "success","userdata":data
    })
})

router.post("/addspeech", async (req, res) => {
    try {
        let data = req.body;
        let speechData = new speechModel(data); // Make sure 'Speech' is imported
        let result = await speechData.save();
        res.status(201).json({ status: "success", message: "Speech added successfully", data: result });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});



router.get(("/view"), async(req,res)=>{
    let result=await speechModel.find().exec()
    res.json(result)
})

router.post("/viewspeech", async (req, res) => {
    try {
        const { userId } = req.body; // Extract userId from the request body
        if (!userId) {
            return res.status(400).json({ error: "UserId is required" });
        }
        const result = await speechModel.find({ userId: userId }).exec(); // Query to find all speeches by userId
        res.json(result); // Send the result back to the client
    } catch (error) {
        res.status(500).json({ error: error.message }); // Handle any possible errors during the execution
    }
});

module.exports=router