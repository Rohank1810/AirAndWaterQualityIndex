const express=require('express')
const router=express.Router()

const officialsModel=require("../models/officials")

router.get("/",(req,res)=>{
  res.render("officialsRegister")
})

router.post("/add",async(req,res)=>{
  let {department,username,password}=req.body
  let createdOfficial=await officialsModel.create({
    department:department,
    username:username,
    password:password,
   })
   console.log(createdOfficial)
   res.redirect("/")
})

router.get("/dashboard",(req,res)=>{
  res.render("officialsDashboard")
})

router.get("/viewAllOfficials", async (req, res) => {
  try {
      const officials = await officialsModel.find(); 
      res.render("viewAllOfficials", { officials }); 
  } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
  }
});

router.get("/updateOfficials",(req,res)=>{
  res.render("updateOfficials")
})

module.exports=router