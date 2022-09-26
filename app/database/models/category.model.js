const mongoose = require("mongoose");
const categorySchema = mongoose.Schema(
  {
        productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
  },
  { timestamps: true } 
)
const Category  = mongoose.model("Category", categorySchema)
module.exports = Category
