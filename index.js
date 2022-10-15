const path = require('path');
const express = require("express");
var bodyparser = require('body-parser');
const app = express();
const hbs = require("hbs");
const dotenv=require("dotenv")
dotenv.config();
const mongo=require("./database");
// const DB = `mongodb://localhost:27017/jobopening`
//const Register = require("./db/model/register");
// const Register = require("./models/register");
const User = require("./db/models/user");

const userRouter = require("./api/login");
const jobRouter = require("./api/listing")
const interestedApplicantRouter = require("./api/applicant")


app.use("/users", userRouter)
app.use("/jobs", jobRouter)
app.use('/applicants', interestedApplicantRouter)


const exp = require('constants');
const { findUserWithEmail } = require('./db/models/user');
const { emit } = require('process');
const port = process.env.PORT || 3000;
// const register = require('../src/models/register');

const static_path = path.join(__dirname, "./frontend");
const template_path = path.join(__dirname, "./frontend/templates/views");
const partials_path = path.join(__dirname, "./frontend/templates/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

//console.log(path.join(__dirname,"../../frontend/pages-register.html"));

app.get("/", async (req, res) => {
    res.render("login");
});



app.get("/register", (req, res) => {
    res.render("register");
});

app.get("/login",(req,res) =>{
    res.render("login");
});
//new user crud
app.post("/register", async (req, res) => {
    console.log(req.body)
    const { name, email, username, password,isTerraformer } = req.body;
    try {
        //const password =req.body.password;
        const saveUser =new saveUser(username,email,password,isTerraformer);
        const saved= await saveUser.save();
        //const registered = await registerUser.save();
        res.status(201).render("login");

    }
    catch (e) {
        res.status(400).send(e);
    }
});

//login validation
app.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const useremail = await Register.findOne({email:email});
        if(useremail.password == password){
            res.status(201).render("index");
        }
        else {
            res.send("invalid login details");
        }


    }
    catch (e) {
        res.status(400).send("invalid credentials");
    }
})

app.listen(port, async() => {
    await mongo.connect();
    console.log(`server is running at port no ${port}`);
});