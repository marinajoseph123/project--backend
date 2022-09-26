const orderModel = require("../database/models/order.model")
const path=require("path")
const fs = require('fs')
class Order{
    static create = async(req,res) =>{
        try{
            const order = new orderModel(req.body)
            await order.save()
            res.status(200).send({
                apiStatus: true,
                data: order,
                message: "order added successfully"
            })
            console.log(order)
        }
        catch(e){
            res.status(500).send({
                apiStatus: false,
                data: e,
                message: e.message
            })
        }
       }
}
module.exports = Order