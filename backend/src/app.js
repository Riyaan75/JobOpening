const path = require('path');
const express = require("express");
const app = express();
const hbs = require("hbs");
// const DB = `mongodb+srv://riyaan75:ayshaRH75@cluster0.0emyic0.mongodb.net/jobOpening?retryWrites=true&w=majority`
require("./db/conn");
const Register = require("./models/register");
const exp = require('constants');
const port = process.env.PORT || 3000;

 const static_path = path.join(__dirname,"../../frontend");
 const template_path = path.join(__dirname,"../../frontend/templates/views");
 const partials_path = path.join(__dirname, "../../frontend/templates/partials");

 app.use(express.json());
 app.use(express.urlencoded({extended:false}));

 app.use(express.static(static_path));
 app.set("view engine","hbs");
 app.set("views",template_path);
 hbs.registerPartials(partials_path);

//console.log(path.join(__dirname,"../../frontend/pages-register.html"));

app.get("/", (req ,res) =>{
    res.render("login");
});



app.get("/register", (req,res) =>{
    res.render("register");
});

app.get("/login",(req,res) =>{
    res.render("index");
});
//new user crud
app.post("/register", async (req,res) =>{
    try{
        //const password =req.body.password;
        const registerUser = new Register({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        });
        const registered = await registerUser.save();
        res.status(201).render("index");

    }
    catch(e){
        res.status(400).send(e);
    }
});

//login validation
app.post("/login", async(req,res) =>{
    try{
        const email = req.body.email;
        const password = req.body.password;

        const useremail = await Register.findOne({email:email});
        if(useremail.password === password){
            res.status(201).render("index");
        }
        else{
            res.send("invalid login details");
        }

        
    }
    catch(e){
        res.status(400).send("invalid credentials");
    }
})

app.listen(port, () =>{
    console.log(`server is running at port no ${port}`);
});