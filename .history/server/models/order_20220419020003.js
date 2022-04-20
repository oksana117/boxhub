
let mongoose = require('mongoose');
let Orders  = mongoose.Schema;


({
    id: {
      type: String
    },
    created: {
    type: Date,
    default: Date.now
    },
    status: {
    type: [{
      type: String,
      enum: ['pending', 'in-progress', 'delivered']
    }],
    default: ['pending']
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

module.exports = mongoose.model('Orders', Orders);

