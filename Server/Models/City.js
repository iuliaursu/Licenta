const mongoose = require('mongoose');
const  Schema = mongoose.Schema;

//Create a schema
const citySchema = new Schema({
    cityName: {
        type: String,
        required: true,
        unique: true,
    },
    countryName: {
        type: String,
        required: true,
    }
});

//Create a model
const City = mongoose.model('city',citySchema);

//Export the model
module.exports = City;