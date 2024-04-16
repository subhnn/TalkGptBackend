const express = require("express")
const cors=require("cors")
const mongoose=require("mongoose")

const app =express()

const securityRoute=require("./controller/router")

app.use(express.json())
app.use(cors())

//connecting to monngodb
mongoose.connect("mongodb+srv://subhan413:413627@cluster0.qb2tssv.mongodb.net/TalkGptDb?retryWrites=true&w=majority",
{useNewUrlParser:true}
)


app.use("/api/user",securityRoute)

app.listen(3001,()=>{
    console.log("server running")
})