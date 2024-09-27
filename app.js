const express=require('express')
const app=express();
const path=require('path')

//user
const userRoutes=require("./routes/user")
const userModel=require("./models/user")
//admin
const adminRoutes=require("./routes/admin")
const adminModel=require("./models/admin")
//Officials
const officialsRoutes=require("./routes/officials")
const officialsModel=require("./models/officials")

const queryRoute=require("./routes/query")


app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(express.static(path.join(__dirname,'/public')))


app.get("/",(req,res)=>{
   res.render("login")
})

app.post('/login', async (req, res) => {
  const { username, password, selectedRole } = req.body;

  try {
    let user;

    if (selectedRole === "admin") {
      user = await adminModel.findOne({ username: username, password: password });
      if (user) {
        return res.redirect("/admin/dashboard");
      }
    } else if (selectedRole === "user") {
      user = await userModel.findOne({ username: username, password: password });
      if (user) {
        return res.redirect("/user/dashboard");
      }
    } else if (selectedRole === "officials") {
      user = await officialsModel.findOne({ username: username, password: password });
      if (user) {
        return res.redirect("/officials/dashboard");
      }
    }
    console.log("Error");
    res.redirect("/login?error=Invalid credentials");
  } catch (err) {
    console.error('Error querying the database:', err);
    res.status(500).send('Internal Server Error');
  }
});

const port=3000
app.listen(port,()=>{
  console.log(`Server started on ${port}`)
})

 //user
app.use("/user",userRoutes)
//admin
app.use("/admin",adminRoutes)
// //officials
app.use("/officials",officialsRoutes)

app.use("/query",queryRoute)