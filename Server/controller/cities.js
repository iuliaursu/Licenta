const City = require('../Models/City');
const Country = require('../Models/Country');

module.exports = {

    getByCountry: async (req, resp, next) => {
        const  countryName  = req.value.body.countryName;

        //Check if exists
        const foundCountry = await Country.findOne({ countryName });
        if(!foundCountry) {
            return resp.status(403).json({ error: 'Invalid name!' });
        }

        //Respond with token
        resp.status(200).json(foundCountry);
    },

    add: async (req, resp, next) => {
        const { cityName, countryName}  = req.value.body;

        //Check if already exists
        const foundCity = await City.findOne({ cityName });
        if(foundCity) {
            return resp.status(403).json({ error: 'City already exists!' });
        }

        //Check if country exists
        const foundCountry = await Country.findOne({ countryName });
        if(!foundCountry) {
            return resp.status(403).json({ error: 'Invalid country!' });
        }

        //Create a new city
        const newCity = new City({ cityName, countryName });
        await newCity.save();

        //Respond with token
        resp.status(200).json({ "message" : "Added!" });
    },

    delete: async (req, resp, next) => {
        const  cityName  = req.value.body.cityName;

        const foundCity = await City.findOne({ cityName });
        if(!foundCity) {
            return resp.status(403).json({ error: 'Invalid name!' });
        }

        //Search for a city to delete
        const deleteCity = await City.deleteOne({ cityName });
        if(!deleteCity) {
        }

        resp.status(200).json({ deleted: 'yes' });
    }

}