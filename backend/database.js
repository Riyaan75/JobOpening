const mongo = require("mongodb").MongoClient;
let client;
async function mongoConnect() {

    if (client) {
        return client
    }
    console.log("Connecting to Database....")
    client = await mongo.connect("mongodb+srv://riyaan75:ayshaRH75@cluster0.0emyic0.mongodb.net/jobOpening")
    console.log("Connected to MongoDB")
    return client
}

module.exports = { mongoConnect }