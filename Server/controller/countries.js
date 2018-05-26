const Country = require('../Models/Country');

module.exports = {
    getAll: async (req, resp, next) => {
        const foundCountries = await Country.find();
        if(!foundCountries) {
            return resp.status(403).json({ error: 'Nothing found!' });
        }

        //Respond with token
        resp.status(200).json(foundCountries);
    },

    add: async (req, resp, next) => {
        const  countryName  = req.value.body.countryName;

        //Check if already exists
        const foundCountry = await Country.findOne({ countryName });
        if(foundCountry) {
            return resp.status(403).json({ error: 'Country already exists!' });
        }

        //Create a new country
        const newCountry = new Country({ countryName });
        await newCountry.save();

        //Respond with token
        resp.status(200).json({ "message" : "Added!" });
    },

    delete: async (req, resp, next) => {
        const  countryName  = req.value.body.countryName;

        const foundCountry = await Country.findOne({ countryName });
        if(!foundCountry) {
            return resp.status(403).json({ error: 'Invalid name!' });
        }

        //Search for a user to delete
        const deleteCountry = await Country.deleteOne({ countryName });

        if(!deleteCountry) {
            return resp.status(403).json({ error: 'Invalid name!' });
        }

        resp.status(200).json({ deleted: 'yes' });
    }

}