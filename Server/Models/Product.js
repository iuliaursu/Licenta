const mongoose = require('mongoose');
const  Schema = mongoose.Schema;

//Create a schema
const productSchema = new Schema({
    typeName: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    }
});

//Create a model
const Product = mongoose.model('product',productSchema);

//Export the model
module.exports = Product;