
let OrdersModel = require("../models/order.js")
let Order = OrdersModel.OrdersSchema;





//var mongoose = require('mongoose'),
    //Order = mongoose.model('Order');

exports.list_all_orders = function(req, res) {
  Order.find({}, function(err, order) {
    if (err)
      res.send(err);
    res.json(order);
  });
};



exports.create_order = function(req, res) {
  var new_order = new Order(req.body);
  new_order.save(function(err, order) {
    if (err)
      res.send(err);
    res.json(order);
  });
};


exports.read_order = function(req, res) {
 Order.findById(req.params.orderId, function(err, order) {
    if (err)
      res.send(err);
    res.json(order);
  });
};


exports.update_order = function(req, res) {
  Order.findOneAndUpdate({_id: req.params.orderId}, req.body, {new: true}, function(err, order) {
    if (err)
      res.send(err);
    res.json(order);
  });
};


exports.delete_order = function(req, res) {


  Order.remove({
    _id: req.params.orderId
  }, function(err, order) {
    if (err)
      res.send(err);
    res.json({ message: 'Order deleted' });
  });
};

