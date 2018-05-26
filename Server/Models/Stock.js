const mongoose = require('mongoose');
const  Schema = mongoose.Schema;

//Create a schema
const stockSchema = new Schema({
    product_id: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true
    }
});

//Create a model
const Stock = mongoose.model('stock',stockSchema);

//Export the model
module.exports = Stock;