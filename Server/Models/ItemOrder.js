const mongoose = require('mongoose');
const  Schema = mongoose.Schema;

//Create a schema
const ItemOrderSchema = new Schema({
    finalOrder_id: {
        type: String,
        required: true,
    },
    product_id: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        required: true
    },
    finalPrice: {
        type: String,
        required: true
    }
});

//Create a model
const ItemOrder = mongoose.model('ItemOrder',ItemOrderSchema);

//Export the model
module.exports = ItemOrder;