
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let OrdersModel = require("../models/order.js")
let Order = OrdersModel.OrdersSchema;

//var mongoose = require('mongoose'),
    //Order = mongoose.model('Order');


module.exports.displayOrderList = (req, res, next) => {
    Order.find((err, orderList) => {
        if (err)
        {
            return console.error(err);
        }
        else
        {
            
            res.render('order/list', {
                title: 'Order List',
                OrderList: orderList});      
        }
    });
}



module.exports.displayAddPage = (req, res, next) => {
    res.render('order/add', {title: 'Add Order'})          
}




module.exports.processAddPage = (req, res, next) => {
    let newOrder = Order({
      "id": req.body.id,
      "created": req.body.created,
      "status": req.body.status,
      "customer": req.body.customer,
      "SKU": req.body.SKU,
      "photo": req.body.photo,
      "condition": req.body.condition,
      "size": req.body.size,
      "type": req.body.type,
      "origin_address": req.body.origin_address,
      "shipping_address":req.body.shipping_address
    });

    Order.create(newOrder, (err, Order) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            
            res.redirect('/order-list');
        }
    });

}



module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Order.findById(id, (err, orderToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            
            res.render('order/edit', {title: 'Edit the order', order: orderToEdit})
        }
    });
}



module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedOrder = Order({
      "_id": id,
      "id": req.body.id,
      "created":req.body.created,
      "status": req.body.status,
      "customer": req.body.customer,
      "SKU": req.body.SKU,
      "photo": req.body.photo,
      "condition": req.body.condition,
      "size": req.body.size,
      "type": req.body.type,
      "origin_address": req.body.origin_address,
      "shipping_address":req.body.shipping_address
      
      
      
    });
    
    Order.updateOne({ _id: id }, updatedOrder, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            
            res.redirect('/order-list');
        }
    });

}


module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Order.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             
             res.redirect('/order-list');
        }
    });
}













































