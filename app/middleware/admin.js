const jwt = require("jsonwebtoken")
// const userDataisAdmin = [{thisname, thisage, thisemail, thispassword}];
const userModel = require("../database/models/user.model")
const Admin = async(req, res, next)=>{
    try{
    const token = req.header("Authorization").replace("bearer ", "")
    const decoded = jwt.verify(token, "g22")
    const userData = await userModel.findOne({
        _id: decoded._id,
        "tokens.token":token,
        // userType:"admin"
    })
    if(!userData.isAdmin) throw new Error("unAdmin")
      next()
}
catch(e){
    res.status(500).send({apiStatus:false, data:e, message:e.message})
}
}
module.exports = Admin