const mongoose = require('mongoose');
const  Schema = mongoose.Schema;

//Create a schema
const productTypeSchema = new Schema({
    typeName: {
        type: String,
        required: true,
        unique: true,
    }
});

//Create a model
const ProductType = mongoose.model('productType',productTypeSchema);

//Export the model
module.exports = ProductType;