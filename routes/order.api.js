const router = require("express").Router()
const auth = require("../app/middleware/auth")
const orderController =  require("../app/controller/order.controller")
router.post("/create",auth ,orderController.create)
module.exports = router