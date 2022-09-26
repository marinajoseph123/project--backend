const categoryModel = require("../database/models/category.model")
const path=require("path")
const fs = require('fs')
class Category{
    static create = async(req,res) =>{
        try{
            const category = new categoryModel(req.body)
            await category.save()
            res.status(200).send({
                apiStatus: true,
                data: category,
                message: "category added successfully"
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
    //    static categoryProducts = async(req,res)=>{
    //     try{
    //         await req.user.populate("myProducts")
    //         res.status(200).send({
    //             data:req.user.myProducts,
    //             message:"data fetched",
    //             apiStatus:true
    //         })
    //     }
    //     catch(e){
    //         res.status(500).send({apiStatus:false, data:e, message:e.message})
    //     }
    // }
}
module.exports = Category