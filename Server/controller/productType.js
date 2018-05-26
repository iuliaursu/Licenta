const ProductTypes = require('../Models/ProductType');

module.exports = {
    getAll: async (req, resp, next) => {
        const foundTypes = await ProductTypes.find();
        if(!foundTypes) {
            return resp.status(403).json({ error: 'Nothing found!' });
        }

        //Respond with token
        resp.status(200).json(foundTypes);
    },

    add: async (req, resp, next) => {
        const  typeName  = req.value.body.typeName;

        //Check if already exists
        const foundType = await ProductTypes.findOne({ typeName });
        if(foundType) {
            return resp.status(403).json({ error: 'Type already exists!' });
        }

        const newType = new ProductTypes({ typeName });
        await newType.save();

        //Respond with token
        resp.status(200).json({ "message" : "Added!" });
    },

    delete: async (req, resp, next) => {
        const  typeName  = req.value.body.typeName;

        const foundType = await ProductTypes.findOne({ typeName });
        if(!foundType) {
            return resp.status(403).json({ error: 'Invalid name!' });
        }

        //Search for a user to delete
        const deleteType = await ProductTypes.deleteOne({ typeName });

        if(!deleteType) {
            return resp.status(403).json({ error: 'Invalid name!' });
        }

        resp.status(200).json({ deleted: 'yes' });
    }

}