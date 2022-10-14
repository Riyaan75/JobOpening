const path = require('path');
const express = require("express");
const app = express();
const hbs = require("hbs");
// const DB = `mongodb://localhost:27017/jobopening`
require("./db/conn");
const Register = require("./models/register");
// const Register = require("./models/register");

const exp = require('constants');
const port = process.env.PORT || 3000;
// const register = require('../src/models/register');

const static_path = path.join(__dirname, "../../frontend");
const template_path = path.join(__dirname, "../../frontend/templates/views");
const partials_path = path.join(__dirname, "../../frontend/templates/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

//console.log(path.join(__dirname,"../../frontend/pages-register.html"));

app.get("/", async (req, res) => {
    const registerUser = new Register({
        name:"nick",
        email:"ajfl@fdkafj",
        username:"dfajlk",
        password:"afdjlkf"
    });
    await registerUser.save();
    res.render("index");
});



app.get("/register", (req, res) => {
    res.render("register");
});

app.get("/login", (req, res) => {

    res.render("login");
});
//new user crud
app.post("/register", async (req, res) => {
    console.log(req.body)
    const { name, email, username, password } = req.body;
    try {
        //const password =req.body.password;
        const registerUser = {
            name:"nick",
            email:"ajfl@fdkafj",
            username:"dfajlk",
            password:"afdjlkf"
        };
        const newUser = new Register(registerUser);
        await newUser.save();
        res.status(201).render("index");
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

        const useremail = await Register.findOne({ email: email });
        if (useremail.password === password) {
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

app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
});