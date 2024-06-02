const  mongoose  = require("mongoose")
require('dotenv').config()
async function connectDB(){
    try {
        await mongoose
        .connect(process.env.MONGODB_URL, {
          dbName: "ChatApp",
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        console.log("DBconnected")
    } catch (error) {
        console.log("Something went wrong" , error)
    }
}

module.exports = connectDB