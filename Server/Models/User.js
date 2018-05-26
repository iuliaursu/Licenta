const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const  Schema = mongoose.Schema;

//Create a schema
const usersSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        $regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true,
        $regex: /^[a-zA-Z]{2,}$/
    },
    lastName: {
        type: String,
        required: true,
        $regex: /^[a-zA-Z]{2,}$/
    },
    address: {
        type: String,
        required: true,
        $regex: /^[a-zA-Z]{2,}$/
    },
    cityName: {
        type: String,
        required: true,
        $regex: /^[a-zA-Z]{2,}$/
    },
    phone: {
        type: String,
        required: true,
        $regex: /^\d{3}-\d{3}-\d{4}$/
    },
    admin: {
        type: Boolean,
        required: true
    }
});

usersSchema.pre('save', async function(next) {
    try{
        //Generate a salt
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash;
        next();
    }catch(error){
        next(error);
    }
});

usersSchema.methods.isValidPassword = async function(newPassword) {
    try{
        return await bcrypt.compare(newPassword, this.password);
    }catch(error){
        throw new Error(error);
    }
}

//Create a model
const User = mongoose.model('user',usersSchema);

//Export the model
module.exports = User;