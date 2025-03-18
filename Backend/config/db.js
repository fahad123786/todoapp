const mongoose = require("mongoose");

const connectdb = async()=>{
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongo Connected Successfully")
}

module.exports = connectdb;