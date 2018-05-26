const mongoose = require('mongoose');
const  Schema = mongoose.Schema;

//Create a schema
const countrySchema = new Schema({
    countryName: {
        type: String,
        required: true,
        unique: true,
    }
});

//Create a model
const Country = mongoose.model('country',countrySchema);

//Export the model
module.exports = Country;