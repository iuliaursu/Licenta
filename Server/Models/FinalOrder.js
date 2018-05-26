const mongoose = require('mongoose');
const  Schema = mongoose.Schema;

//Create a schema
const FinalOrderSchema = new Schema({
    client_id: {
        type: String,
        required: true,
    },
    time_created: {
        type: String,
        required: true,
    },
    delivery_cost: {
        type: String,
        required: true
    },
    final_price: {
        type: String,
        required: true
    },
    discount: {
        type: String,
        required: true
    },
    total: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

//Create a model
const FinalOrder = mongoose.model('FinalOrder',FinalOrderSchema);

//Export the model
module.exports = FinalOrder;