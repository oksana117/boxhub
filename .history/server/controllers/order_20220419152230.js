
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

//displays add new business contacts page user logged in

module.exports.displayAddPage = (req, res, next) => {
    res.render('order/add', {title: 'Add Order'})          
}


//process  add new business contacts page user logged in

module.exports.processAddPage = (req, res, next) => {
    let newOrder = Order({
      "id": req.body.id,
      "status": req.body.status,
      "customer": req.body.customer,
      "SKU"
        
    });

    Business.create(newBusiness, (err, Business) =>{
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

// displays edit page when user logged in

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Business.findById(id, (err, businessToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('business/edit', {title: 'Edit Contact Information', 
            displayName: req.user ? req.user.displayName : ''})
        }
    });
}

// process edit page if user logged in

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedBusiness = Business({
        "_id": id,
        "nameCustomer": req.body.nameCustomer,
        "numberCustomer": req.body.numberCustomer,
        "emailCustomer": req.body.emailCustomer
    });
    
    Business.updateOne({ _id: id }, updatedBusiness, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            
            res.redirect('/business-list');
        }
    });

}













































