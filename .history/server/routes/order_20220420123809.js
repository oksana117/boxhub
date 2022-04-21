
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let orderController = require('../controllers/order');


/* GET Route for the Contacts List Page - read operation */
router.get('/', orderController.displayOrderList);

router.post('/',or)
/* GET Route for displaying  Add Page - create operation */
router.get('/add', orderController.displayAddPage);

/* GET Route for processing Add Page - create operation */
router.post('/add', orderController.processAddPage);

/* GET Route for displaying  Edit Page - update operation */
router.get('/edit/:id',  orderController.displayEditPage);

/* GET Route for processing Edit Page - update operation */
router.post('/edit/:id',  orderController.processEditPage);

/* GET Route to perform   Deletion Page - delete operation */
router.get('/delete/:id',  orderController.performDelete);

module.exports = router;


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