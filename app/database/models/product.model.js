const mongoose = require("mongoose")
const bcryptjs = require("bcryptjs") 
  const productSchema = mongoose.Schema(
    {
      userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
      name: {
        type: String,
        lowercase: true,
        unique: true,
        trim: true,
      },
      description: {
        type: String,
        lowercase: true,
        trim: true,
      },
      price: {
        type: Number,
        default: 1,
      },
      image: {
        type: String,
      },
      quantity: {
        type: Number,
        default: 1,
      }
      },
      { timestamps:true }
      
      ) //to include createdAt and updatedAt
      productSchema.virtual("myCategoys", {
        ref:"Category",
        localField: "_id",
        foreignField:"productId"
    })
   
    const Product  = mongoose.model("Product", productSchema)
    module.exports = Product


