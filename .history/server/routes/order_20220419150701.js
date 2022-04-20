
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

et orderController = require('../controllers/business');

/*
module.exports = function(app) {
  var order = require('../controllers/order');

  // Order Routes
  app.route('/orders')
    .get(order.list_all_orders)
    .post(order.create_order);


  app.route('/orders/:orderId')
    .get(order.read_order)
    .put(order.update_order)
    .delete(order.delete_order);
};*/