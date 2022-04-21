
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let OrdersModel = require("../models/order.js")
let Order = OrdersModel.OrdersSchema;
const multer = require("multer");


//photo
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });



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

module.exports.processOrderList = (req, res, next) => {
    let id = req.params.id
    let status = req.body.status;
    let size = req.body.size;
    let condition = req.body.condition;
    let type = req.body.type;

    Order.findById(id, async(err, orderList )=> {
        let matchingOrder = new Array();
        let OrderArray = OrdersModel;
        
        if (status === "" && size === "" && condition == "" && type === "") {
            for (var i = 0; i <OrderArray.length; i++) {
                let order = await Order.findById(OrderArray[i])
                matchingOrder.push(order)
            }
               
        }
        else {
            for (var i = 0; i < OrderArray.length; i++) {
                let order = await Order.findById(OrderArray[i]);

                if ((status === "" || order.status === status) &&
                    (size === "" || order.size === size) &&
                    (condition === "" || order.condition === condition) &&
                    (type === "" || order.type === type)) {
                    matchingOrder.push(order)
                }
                break; 
            }
        }
        res.render('order/list', {
            title: 'Order List',
            OrderList: orderList,
            Order: matchingOrder
        })
        
    })
}





module.exports.displayAddPage = (req, res, next) => {
    res.render('order/add', {title: 'Add Order'})          
}



module.exports.processAddPage = upload.single(""),(req, res, next) => {

     
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













































