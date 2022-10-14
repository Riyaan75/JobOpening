const mongoose = require("mongoose");
//mongoose.connect("mongodb+srv://admin-riyaan:Test123@cluster0.klvgm.mongodb.net/todolistDB", {useNewUrlParser:true});
mongoose.connect("mongodb+srv://riyaan75:ayshaRH75@cluster0.0emyic0.mongodb.net/jobOpening",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() => {
    console.log(`connection successful`);
}).catch((e) => {
    console.log(e);
})