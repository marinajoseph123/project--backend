require('dotenv').config()
require('./database/connection')

const express = require("express")
const path = require("path")
const cors = require("cors")
const app = express()
app.use(cors())
const staticDir = path.join(__dirname, "../public")
app.use(express.static(staticDir))

app.use(express.urlencoded({extended:true}))
app.use(express.json())
const userRoutes = require('../routes/user.api')
app.use("/user",userRoutes)
const productRoutes = require("../routes/product.api")
app.use("/product",productRoutes)
// const adminRoutes = require("../routes/admin.api")
// app.use("/admin",adminRoutes)
const categoryRoutes = require("../routes/category.api")
app.use("/category",categoryRoutes)
const orderRoutes = require("../routes/order.api")
app.use("/order",orderRoutes)
module.exports = app 