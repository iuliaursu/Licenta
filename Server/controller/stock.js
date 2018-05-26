const Stock = require('../Models/Stock');
const Product = require('../Models/Product');

module.exports = {
    getStock: async (req, resp, next) => {
        const  product_id = req.value.body.product_id;

        const foundProduct = await Product.findOne({ _id: product_id });
        if(!foundProduct) {
            return resp.status(403).json({ error: 'Error!' });
        }

        const stock = await Stock.findOne({ product_id });
        if(!stock) {
            return resp.status(403).json({ error: 'Error!' });
        }

        //Respond with token
        resp.status(200).json({ stock : stock.stock });
    },

    setStock: async (req, resp, next) => {
        const  product_id = req.value.body.product_id;
        const  stock = req.value.body.stock;

        const foundProduct = await Product.findOne({ _id: product_id });
        if(!foundProduct) {
            return resp.status(403).json({ error: 'Error!' });
        }

        const updateStock = await Stock.update({ product_id },{$set:{ stock }});
        if (!updateStock) {
            return resp.status(403).json({error: 'Error!'});
        }

        //Respond with token
        resp.status(200).json({message: 'Updated!'});
    },

    add: async (req, resp, next) => {
        const  {product_id, stock}  = req.value.body;

        const foundStock = await Stock.findOne({ product_id });
        if(foundStock) {
            return resp.status(403).json({ error: 'Stock already exists!!' });
        }

        const foundProduct = await Product.findOne({ _id : product_id });
        if(!foundProduct) {
            return resp.status(403).json({ error: 'Invalid product id!' });
        }

        const newStock = new Stock({ product_id, stock });
        await newStock.save();

        //Respond with token
        resp.status(200).json({ "message" : "Added!" });
    },

    delete: async (req, resp, next) => {
        const  product_id = req.value.body.product_id;

        const foundProduct = await Product.findOne({ _id: product_id });
        if(!foundProduct) {
            return resp.status(403).json({ error: 'Error!' });
        }

        const deleteStock = await Stock.deleteOne({ product_id });
        if(!deleteStock) {
            return resp.status(403).json({ error: 'Invalid name!' });
        }

        resp.status(200).json({ deleted: 'yes' });
    }

}