const router = require("express").Router()
// const auth = require("../app/middleware/auth")
const Admin = require("../app/middleware/admin")
const categoryController =  require("../app/controller/category.controller")
router.post("/create", Admin ,categoryController.create)
module.exports = router