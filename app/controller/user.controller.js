const userModel = require("../database/models/user.model")
const path=require("path")
const fs = require('fs')
class User{
    static register = async(req,res) =>{
        try{
            const user = new userModel(req.body)
            await user.save()
            const token = await user.generateToken()
            res.status(200).send({
                apiStatus: true,
                data: {user, token},
                message: "user added successfully"
            })
            console.log(user)
        }
        catch(e){
            res.status(500).send({
                apiStatus: false,
                data: e,
                message: e.message
            })
        }
       }
       static all = async(req,res) =>{
        try{
            const users = await userModel.find()
            res.status(200).send({
                apiStatus: true,
                data: users,
                message: "all data fetched"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus: false,
                data: e,
                message: e.message
            })
        }
       }
       static single = async(req,res) =>{
        try{
            const users = await userModel.findById(req.params.id)
            res.status(200).send({
                apiStatus: true,
                data: users,
                message: "user data fetched"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus: false,
                data: e,
                message: e.message
            })
        }
       }
       static login = async(req, res)=>{
        try{
            const userData = await userModel.login(req.body.email, req.body.password)
            const token = await userData.generateToken()
            res.status(200).send({
                apiStatus: true,
                data: {userData, token},
                message: "Logged in"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus: false,
                data: e,
                message: e.message
            })
        }
       }
       static me =  (req,res)=> {
        res.status(200).send({apiStatus:true,data:req.user, message:"user profile"})
   }
   static deleteUser = async(req,res) =>{
    try{
        const users = await userModel.findByIdAndDelete(req.params.id)
        res.status(200).send({
            apiStatus: true,
            data: users,
            message: "user data fetched"
        })
    }
    catch(e){
        res.status(500).send({
            apiStatus: false,
            data: e,
            message: e.message
        })
    }
   }
   static editUser = async(req,res) =>{
    try{
        const myUpdates = Object.keys(req.body)
        const allowedEdits = ["name", "age"]
        const validEdits = myUpdates.every(
            (update) => allowedEdits.includes(update)
            )
        if(!validEdits) throw new Error ("invalid edits")
        const user = await userModel.findById(req.params.id)
        if(!user) throw new Error("invalid id")
        myUpdates.forEach(update => user[update]= req.body[update])
        await user.save()
        res.status(200).send({
            apiStatus: true,
            data: user,
            message: "user data fetched"
        })
    }
    catch(e){
        res.status(500).send({
            apiStatus: false,
            data: e,
            message: e.message
        })
    }
   }
   static editPass = async(req,res) =>{
    try{
        const user = await userModel.findById(req.params.id)
        if(!user) throw new Error("invalid id")
        const valid = await userModel.checkPass(user, req.body.oldPass)
        if(!valid)throw new Error ("invalid password")
        user.password= req.body.password
        await user.save()
        res.status(200).send({
            apiStatus: true,
            data: user,
            message: "user data fetched"
        })
    }
    catch(e){
        res.status(500).send({
            apiStatus: false,
            data: e,
            message: e.message
        })
    }
   }
   static logout = async(req, res)=>{
    try{
        res.user.tokens= req.user.tokens.filter(t=> t.token != req.token)
        await req.user.save()
        res.status(200).send({
            apiStatus:true,
            data:"",
            message:"logged out all devices"
        })
    }
    catch(e){
        res.status(500).send({apiStatus:false, data:e, message:e.message})
    }

   }
   static logoutAll = async(req, res)=>{
        try{
            res.user.tokens=[]
            await req.user.save()
            res.status(200).send({
                apiStatus:true,
                data:"",
                message:"logged out all devices"
            })
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e, message:e.message})
        }
   }
   static changeStatus = async(req,res)=>{
    try{
        if(req.body.status=="activate")
            req.user.status=true
        else 
            req.user.status=false
        await req.user.save()
            res.send(req.user)
    }
    catch(e){
        res.status(500).send({apiStatus:false})
    }
   }
   static imgUpload = async(req, res)=> {
    try{
      const ext = path.extname(req.file.originalname)
     fs.renameSync(req.file.path, `${req.file.path}${ext}`)
     let oldImg 
     if(req.user.image)
     oldImg =path.join(__dirname,"../", "public", req.user.image)
     else 
     oldImg=null
     req.user.image = `${req.file.filename}${ext}`
     await req.user.save()
     if(oldImg) fs.unlinkSync(oldImg)
     res.send({user:req.user, b:req.body})
 }
 catch(e){
     res.send(e)
 }
 }
 static delMe = async(req,res)=>{
    try{
        await req.user.remove()
        res.send("done")
    }
    catch(e){res.send({error:e.message})}
 }
//  static cart = async(req,res) =>{
//     try{
//         const user = new userModel(req.body)
//         await user.save()
//         const token = await user.generateToken()
//         res.status(200).send({
//             apiStatus: true,
//             data: {user, token},
//             message: "user added successfully"
//         })
//         console.log(user)
//     }
//     catch(e){
//         res.status(500).send({
//             apiStatus: false,
//             data: e,
//             message: e.message
//         })
//     }
//    }

}
module.exports = User