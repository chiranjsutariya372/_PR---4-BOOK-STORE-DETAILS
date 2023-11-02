const mongoose = require('mongoose')

const data= async()=>{
    await mongoose.connect("mongodb+srv://chiranjsutariya372:chiranj@cluster0.vzywpba.mongodb.net/?retryWrites=true&w=majority")
    console.log("connected to MongoDB");
}

module.exports = data