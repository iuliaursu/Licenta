const bcrypt = require('bcryptjs');
const User = require('../Models/User');
const City = require('../Models/City');
const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('../Configuration/index');

signToken = user => {
    return JWT.sign({
        iss: 'Petshop',
        id: user.id,
        iat: new Date().getTime(),
        expiresIn: new Date().setDate(new Date().getDate() + 1)
    }, JWT_SECRET);
};

module.exports = {

    getAdmin: async (req, resp, next) => {
        const  email = req.value.body.email;

        const foundUser = await User.findOne({ email });
        if(!foundUser) {
            return resp.status(403).json({ error: 'Error!' });
        }

        //Respond with token
        resp.status(200).json({admin: foundUser.admin});
    },

    getCityName: async (req, resp, next) => {
        const  email = req.value.body.email;

        const foundUser = await User.findOne({ email });
        if(!foundUser) {
            return resp.status(403).json({ error: 'Error!' });
        }

        //Respond with token
        resp.status(200).json({cityName: foundUser.cityName});
    },

    getAddress: async (req, resp, next) => {
        const  email = req.value.body.email;

        const foundUser = await User.findOne({ email });
        if(!foundUser) {
            return resp.status(403).json({ error: 'Error!' });
        }

        //Respond with token
        resp.status(200).json({address: foundUser.address});
    },

    getLastName: async (req, resp, next) => {
        const  email = req.value.body.email;

        const foundUser = await User.findOne({ email });
        if(!foundUser) {
            return resp.status(403).json({ error: 'Error!' });
        }

        //Respond with token
        resp.status(200).json({lastName: foundUser.lastName});
    },

    getFirstName: async (req, resp, next) => {
        const  email = req.value.body.email;

        const foundUser = await User.findOne({ email });
        if(!foundUser) {
            return resp.status(403).json({ error: 'Error!' });
        }

        //Respond with token
        resp.status(200).json({firstName: foundUser.firstName});
    },

    getPhone: async (req, resp, next) => {
        const  email = req.value.body.email;

        const foundUser = await User.findOne({ email });
        if(!foundUser) {
            return resp.status(403).json({ error: 'Error!' });
        }

        //Respond with token
        resp.status(200).json({phone: foundUser.phone});
    },

    getPassword: async (req, resp, next) => {
        const  email = req.value.body.email;

        const foundUser = await User.findOne({ email });
        if(!foundUser) {
            return resp.status(403).json({ error: 'Error!' });
        }

        //Respond with token
        resp.status(200).json({password: foundUser.password});
    },

    setAdmin: async (req, resp, next) => {
        const  email = req.value.body.email;
        let  admin = req.value.body.other;

        const foundUser = await User.findOne({ email });
        if(!foundUser) {
            return resp.status(403).json({ error: 'Error!' });
        }

        const updateUser = await User.update({ email },{$set:{ admin }});
        if (!updateUser) {
            return resp.status(403).json({error: 'Error!'});
        }

        //Respond with token
        resp.status(200).json({message: 'Updated!'});
    },

    setCityName: async (req, resp, next) => {
        const  email = req.value.body.email;
        let  cityName = req.value.body.other;

        const foundCity = await City.findOne({ cityName });
        if(!foundCity) {
            return resp.status(403).json({ error: 'City not found!' });
        }

        const foundUser = await User.findOne({ email });
        if(!foundUser) {
            return resp.status(403).json({ error: 'Error!' });
        }

        const updateUser = await User.update({ email },{$set:{ cityName }});
        if (!updateUser) {
            return resp.status(403).json({error: 'Error!'});
        }

        //Respond with token
        resp.status(200).json({message: 'Updated!'});
    },

    setAddress: async (req, resp, next) => {
        const  email = req.value.body.email;
        let  address = req.value.body.other;

        const foundUser = await User.findOne({ email });
        if(!foundUser) {
            return resp.status(403).json({ error: 'Error!' });
        }

        const updateUser = await User.update({ email },{$set:{ address }});
        if (!updateUser) {
            return resp.status(403).json({error: 'Error!'});
        }

        //Respond with token
        resp.status(200).json({message: 'Updated!'});
    },

    setLastName: async (req, resp, next) => {
        const  email = req.value.body.email;
        let  lastName = req.value.body.other;

        const foundUser = await User.findOne({ email });
        if(!foundUser) {
            return resp.status(403).json({ error: 'Error!' });
        }

        const updateUser = await User.update({ email },{$set:{ lastName }});
        if (!updateUser) {
            return resp.status(403).json({error: 'Error!'});
        }

        //Respond with token
        resp.status(200).json({message: 'Updated!'});
    },

    setFirstName: async (req, resp, next) => {
        const  email = req.value.body.email;
        let  firstName = req.value.body.other;

        const foundUser = await User.findOne({ email });
        if(!foundUser) {
            return resp.status(403).json({ error: 'Error!' });
        }

        const updateUser = await User.update({ email },{$set:{ firstName }});
        if (!updateUser) {
            return resp.status(403).json({error: 'Error!'});
        }

        //Respond with token
        resp.status(200).json({message: 'Updated!'});
    },

    setPhone: async (req, resp, next) => {
        const  email = req.value.body.email;
        let  phone = req.value.body.other;

        const foundUser = await User.findOne({ email });
        if(!foundUser) {
            return resp.status(403).json({ error: 'Error!' });
        }

        const updateUser = await User.update({ email },{$set:{ phone }});
        if (!updateUser) {
            return resp.status(403).json({error: 'Error!'});
        }

        //Respond with token
        resp.status(200).json({message: 'Updated!'});
    },

    setPassword: async (req, resp, next) => {
        const  email = req.value.body.email;
        let  password = req.value.body.other;

        const foundUser = await User.findOne({ email });
        if(!foundUser) {
            return resp.status(403).json({ error: 'Error!' });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        password = hash;

       const updateUser = await User.update({ email },{$set:{ password }});
        if (!updateUser) {
            return resp.status(403).json({error: 'Error!'});
        }

        //Respond with token
        resp.status(200).json({message: 'Updated!'});
    },

    signUp: async (req, resp, next) => {
        const {email, password, firstName, lastName, address, cityName, phone , admin } = req.value.body;

        //Check if there is a user with the same email
        const foundUser = await User.findOne({ email });
        if(foundUser) {
            return resp.status(403).json({ error: 'Email is already in use!' });
        }

        //Check if there is a city with the same name in DB
        const foundCity = await City.findOne({ cityName });
        if(!foundCity) {
            return resp.status(403).json({ error: 'Invalid city!' });
        }

        //Create a new user
        const newUser = new User({email, password, firstName, lastName, address, cityName, phone, admin});
        await newUser.save();

        //Generate token
        const token = signToken(newUser);

        //Respond with token
        resp.status(200).json({ token });
    },

    signIn: async (req, resp, next) => {
        //Generate token
        const token = signToken(req.user);

        //Respond with token
        resp.status(200).json({ token });
    },

    secret: async (req, resp, next) => {
        resp.status(200).json({ secret: 'resource' });
    },

    delete: async (req, resp, next) => {
        const email= req.value.body.email;

        const foundUser = await User.findOne({ email });
        if(!foundUser) {
            return resp.status(403).json({ error: 'Invalid email!' });
        }

        //Search for a user to delete
        const deleteUser = await User.deleteOne({ email });
        if(!deleteUser) {
            return resp.status(403).json({ error: 'Invalid email!' });
        }

        resp.status(200).json({ deleted: 'yes' });
    }

}