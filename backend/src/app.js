const path = require('path');
const express = require("express");
const app = express();
const hbs = require("hbs");
// const DB = `mongodb+srv://riyaan75:ayshaRH75@cluster0.0emyic0.mongodb.net/jobOpening?retryWrites=true&w=majority`
require("./db/conn");
const port = process.env.PORT || 3000;

 const static_path = path.join(__dirname,"../../frontend");
 const template_path = path.join(__dirname,"../../frontend/templates/views");
 const partials_path = path.join(__dirname, "../../frontend/templates/partials");
 app.use(express.static(static_path));
 app.set("view engine","hbs");
 app.set("views",template_path);
 hbs.registerPartials(partials_path);

//console.log(path.join(__dirname,"../../frontend/pages-register.html"));

app.get("/", (req ,res) =>{
    res.render("index");
});

app.get("/register", (req,res) =>{
    res.render("register");
});

app.listen(port, () =>{
    console.log(`server is running at port no ${port}`);
});