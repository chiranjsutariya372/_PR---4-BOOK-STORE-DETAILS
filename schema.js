const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    title: String,
    author: String,
    category: String,
    publicationYear: Number,
    price: Number,
    quantity: Number,
    description: String,
    imageUrl: String,
  }, { timestamps: true }
)

const user =mongoose.model("Book-Store",userSchema)


module.exports=user
