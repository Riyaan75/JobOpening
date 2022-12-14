require("dotenv").config()
const mongo = require("mongodb");
const uri = process.env.MONGO_DB_URI
console.log(uri)
async function connect() {
  let client;
  if (client) {
    console.log("Reconnecting to MongoDB");
    return this.client;
  }
  client = new mongo.MongoClient(uri);
  try {
    console.log("Connecting to MongoDB Cluster....");

    await client.connect();
    console.log("Connected to MongoDB Cluster");
    return this.client
  } catch (e) {
    throw e;
  }
}

module.exports = { connect };

 