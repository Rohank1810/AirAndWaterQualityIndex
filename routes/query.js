const express=require('express')
const router=express.Router()
const queryModel=require("../models/Query")

router.get("/",(req,res)=>{
  res.render("userRegister")
})



module.exports=router
