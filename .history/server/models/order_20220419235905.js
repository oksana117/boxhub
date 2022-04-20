
let mongoose = require('mongoose');
let OrdersSchema = mongoose.Schema({
    
    id: {
      type: String
    },
    created: {
    type: Date,
    //default: Date.now
    },
    // can do default setting for Date.now for creating an order
    status: {
 
      type: String
    
    },
    customer: {
    type: String
    },
    SKU: {
        type: String
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    condition: {
        type: String
    },
    size: {
        type: String
    },
    type: {
        type: String
    },
    origin_address: {
        type: String
    },
    shipping_address: {
        type: String
    }
    
});

module.exports.OrdersSchema = mongoose.model("Order", OrdersSchema);

