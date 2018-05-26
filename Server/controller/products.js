const ProductTypes = require('../Models/ProductType');
const Product = require('../Models/Product');

module.exports = {
    getTypeName: async (req, resp, next) => {
        const  name = req.value.body.name;

        const foundProduct = await Product.findOne({ name });
        if(!foundProduct) {
            return resp.status(403).json({ error: 'Error!' });
        }

        //Respond with token
        resp.status(200).json({typeName: foundProduct.typeName});
    },

    getDescription: async (req, resp, next) => {
        const  name = req.value.body.name;

        const foundProduct = await Product.findOne({ name });
        if(!foundProduct) {
            return resp.status(403).json({ error: 'Error!' });
        }

        //Respond with token
        resp.status(200).json({ description: foundProduct.description });
    },

    getPrice: async (req, resp, next) => {
        const  name = req.value.body.name;

        const foundProduct = await Product.findOne({ name });
        if(!foundProduct) {
            return resp.status(403).json({ error: 'Error!' });
        }

        //Respond with token
        resp.status(200).json({price: foundProduct.price});
    },

    setTypeName: async (req, resp, next) => {
        const  name = req.value.body.name;
        const typeName = req.value.body.other;

        const foundProduct = await Product.findOne({ name });
        if(!foundProduct) {
            return resp.status(403).json({ error: 'Error!' });
        }

        const foundType = await ProductTypes.findOne({ typeName });
        if(!foundType) {
            return resp.status(403).json({ error: 'Error!' });
        }

        const updateProduct = await Product.update({ name },{$set:{ typeName }});
        if (!updateProduct) {
            return resp.status(403).json({error: 'Error!'});
        }

        //Respond with token
        resp.status(200).json({message: 'Updated!'});
    },

    setDescription: async (req, resp, next) => {
        const  name = req.value.body.name;
        const description = req.value.body.other;

        const foundProduct = await Product.findOne({ name });
        if(!foundProduct) {
            return resp.status(403).json({ error: 'Error!' });
        }

        const updateProduct = await Product.update({ name },{$set:{ description }});
        if (!updateProduct) {
            return resp.status(403).json({error: 'Error!'});
        }

        //Respond with token
        resp.status(200).json({message: 'Updated!'});
    },

    setPrice: async (req, resp, next) => {
        const  name = req.value.body.name;
        const price = req.value.body.other;

        const foundProduct = await Product.findOne({ name });
        if(!foundProduct) {
            return resp.status(403).json({ error: 'Error!' });
        }

        const updateProduct = await Product.update({ name },{$set:{ price }});
        if (!updateProduct) {
            return resp.status(403).json({error: 'Error!'});
        }

        //Respond with token
        resp.status(200).json({message: 'Updated!'});
    },

    getByType: async (req, resp, next) => {
        const  typeName  = req.value.body.name;

        const foundType = await ProductTypes.findOne({ typeName });
        if(!foundType) {
            return resp.status(403).json({ error: 'Nothing found!' });
        }

        const productsByType = await Product.find({ typeName });
        if(!productsByType) {
            return resp.status(403).json({ error: 'Nothing found!' });
        }
        //Respond with token
        resp.status(200).json(productsByType);
    },

    add: async (req, resp, next) => {
        const  {typeName, name, description, price}  = req.value.body;

        const foundType = await ProductTypes.findOne({ typeName });
        if(!foundType) {
            return resp.status(403).json({ error: 'Invalid type!' });
        }

        const foundProduct = await Product.findOne({ name });
        if(foundProduct) {
            return resp.status(403).json({ error: 'Product already exists!' });
        }

        const newProduct = new Product({ typeName, name, description, price });
        await newProduct.save();

        //Respond with token
        resp.status(200).json({ "message" : "Added!" });
    },

    delete: async (req, resp, next) => {
        const  name  = req.value.body.name;

        const foundProduct = await Product.findOne({ name });
        if(!foundProduct) {
            return resp.status(403).json({ error: 'Invalid name!' });
        }

        const deleteType = await Product.deleteOne({ name });
        if(!deleteType) {
            return resp.status(403).json({ error: 'Invalid name!' });
        }

        resp.status(200).json({ deleted: 'yes' });
    }

}