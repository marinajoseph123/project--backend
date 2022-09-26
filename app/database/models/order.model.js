const mongoose = require("mongoose");
const orderSchema = mongoose.Schema(
  {
   userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        default: 1,
      }
    ,
  },
  { timestamps: true } 
)
orderSchema.virtual("myProducts", {
    ref:"Product",
    localField: "_id",
    foreignField:"orderId"
})
const Order  = mongoose.model("Order", orderSchema)
module.exports = Order