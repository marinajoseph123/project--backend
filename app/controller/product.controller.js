const productModel = require("../database/models/product.model")
const path=require("path")
const fs = require('fs')
const { findById } = require("../database/models/product.model")
class Product {
    static create = async(req,res) =>{
        try{
            const product = new productModel(req.body)
            await product.save()
            res.status(200).send({
                apiStatus: true,
                data: product,
                message: "product added successfully"
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
      
       static all = async(req,res) =>{
        try{
            const products = await productModel.find()
            res.status(200).send({
                apiStatus: true,
                data: products,
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
            const products = await productModel.findById(req.params.id)
            res.status(200).send({
                apiStatus: true,
                data: products,
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
       static deleteProduct = async(req,res) =>{
        try{
            const products = await productModel.findByIdAndDelete(req.params.id)
            res.status(200).send({
                apiStatus: true,
                data: products,
                message: "product data fetched"
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
       static editProduct = async(req,res) =>{
        try{
            const myUpdates = Object.keys(req.body)
            const allowedEdits = ["name", "price"]
            const validEdits = myUpdates.every(
                (update) => allowedEdits.includes(update)
                )
            if(!validEdits) throw new Error ("invalid edits")
            const product = await productModel.findById(req.params.id)
            if(!product) throw new Error("invalid id")
            myUpdates.forEach(update => product[update]= req.body[update])
            await product.save()
            res.status(200).send({
                apiStatus: true,
                data: product,
                message: "product data fetched"
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
 
 static imgUpload = async(req, res)=> {
    try{
        const data = await productModel.findById(req.params.id)
        res.status(200).send({
            apiStatus: true,
            data: data,
            message: "image fetched"
        })
        const ext = path.extname(req.file.originalname)
     fs.renameSync(req.file.path, `${req.file.path}${ext}`)
     let oldImg 
     if(req.productId.image)
     oldImg =path.join(__dirname,"../", "public", req.productId.image)
     else 
     oldImg=null
     req.productId.image = `${req.file.filename}${ext}`
     await req.productId.save()
     if(oldImg) fs.unlinkSync(oldImg)
     res.send({product:req.productId, b:req.body})
 }
 catch(e){
     res.send(e)
 }
 }
 static userProducts = async(req,res)=>{
    try{
        await req.user.populate("myProducts")
        res.status(200).send({
            data:req.user.myProducts,
            message:"data fetched",
            apiStatus:true
        })
    }
    catch(e){
        res.status(500).send({apiStatus:false, data:e, message:e.message})
    }
}
}

module.exports = Product