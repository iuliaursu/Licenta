const ItemOrder = require('../Models/ItemOrder');
const Product = require('../Models/Product');
const Stock = require('../Models/Stock');
const FinalOrder = require('../Models/FinalOrder');

module.exports = {
    getById: async (req, resp, next) => {
        const  id = req.value.body.id;

        const foundOrder = await ItemOrder.findOne({ _id : id });
        if(!foundOrder) {
            return resp.status(403).json({ error: 'Error!' });
        }

        //Respond with token
        resp.status(200).json({ foundOrder });
    },

    setQuantity: async (req, resp, next) => {
        const  id = req.value.body.id;
        const quantity = req.value.body.other;
        let delivery_cost = 0;

        if (Number(quantity) < 0){
            return resp.status(403).json({ error: 'Error!' });
        }

        const foundOrder = await ItemOrder.findOne({ _id : id });
        if(!foundOrder) {
            return resp.status(403).json({ error: 'Error!' });
        }

        const difference = foundOrder.quantity - quantity;

        const foundItem = await Product.findOne({ _id : foundOrder.product_id });
        if(!foundItem) {
            return resp.status(403).json({ error: 'Invalid id!' });
        }

        const finalPrice = Number(quantity) * Number( foundItem.price.substring(0,foundItem.price.indexOf(" ")) );

        const stock = await Stock.findOne({ product_id : foundOrder.product_id });
        if(!stock) {
            return resp.status(403).json({ error: 'Invalid product id!' });
        }
        if ( Number(stock.stock) < Number(quantity)) {
            return resp.status(403).json({ error: 'Invalid quantity!' });
        }

        const updateOrder = await ItemOrder.update({ _id : id },{$set:{ quantity , finalPrice}});
        if (!updateOrder) {
            return resp.status(403).json({error: 'Error!'});
        }

        const updateStock = await Stock.update({ _id : stock._id },{$set:{ stock : Number(stock.stock) + Number(difference)}});
        if (!updateStock) {
            return resp.status(403).json({error: 'Error!'});
        }

        const foundFinalOrder = await FinalOrder.findOne({ _id : foundOrder.finalOrder_id });
        if(!foundFinalOrder) {
            return resp.status(403).json({ error: 'Invalid id!' });
        }

        const updateFinalOrder = await FinalOrder.update({ _id : foundOrder.finalOrder_id },{$set:
                { final_price : Number(finalPrice)}});

        if (!updateFinalOrder) {
            return resp.status(403).json({error: 'Error!'});
        }

        if ( (Number(foundFinalOrder.final_price) + Number(finalPrice)) < 100 ) {
            delivery_cost = 15;
            const updateFinalOrderDelivery = await FinalOrder.update({_id: foundOrder.finalOrder_id}, {
                $set:
                    {delivery_cost: 15}
            });
        }else {
            const updateFinalOrderDelivery = await FinalOrder.update({_id: foundOrder.finalOrder_id}, {
                $set:
                    {delivery_cost: 0}
            });
        }
        const updateFinalOrderTotal = await FinalOrder.update({ _id : foundOrder.finalOrder_id },{$set:
                { total : Number(finalPrice) + Number(delivery_cost)}});

        //Respond with token
        resp.status(200).json({message: 'Updated!'});
    },

    add: async (req, resp, next) => {
        const  { finalOrder_id , product_id , quantity }  = req.value.body;

        let delivery_cost = 0;

        const foundItem = await Product.findOne({ _id : product_id });
        if(!foundItem) {
            return resp.status(403).json({ error: 'Invalid id!' });
        }

        if (Number(quantity) < 0){
            return resp.status(403).json({ error: 'Error!' });
        }

        const stock = await Stock.findOne({ product_id });
        if(!stock) {
            return resp.status(403).json({ error: 'Invalid product id!' });
        }
        if ( Number(stock.stock) < Number(quantity)) {
            return resp.status(403).json({ error: 'Invalid quantity!' });
        }

        const finalPrice = Number(quantity) * Number( foundItem.price.substring(0,foundItem.price.indexOf(" ")) );

        const newOrder = new ItemOrder({finalOrder_id , product_id , finalPrice , quantity });
        await newOrder.save();

        const updateStock = await Stock.update({ _id : stock._id },{$set:{ stock : Number(stock.stock) - Number(quantity)}});
        if (!updateStock) {
            return resp.status(403).json({error: 'Error!'});
        }

        const foundFinalOrder = await FinalOrder.findOne({ _id : finalOrder_id });
        if(!foundFinalOrder) {
            return resp.status(403).json({ error: 'Invalid id!' });
        }

        const updateFinalOrder = await FinalOrder.update({ _id : finalOrder_id },{$set:
                                    { final_price : Number(foundFinalOrder.final_price) + Number(finalPrice)}});

        if (!updateFinalOrder) {
            return resp.status(403).json({error: 'Error!'});
        }

        if ( (Number(foundFinalOrder.final_price) + Number(finalPrice)) < 100 ) {
            delivery_cost = 15;
            const updateFinalOrderDelivery = await FinalOrder.update({_id: finalOrder_id}, {
                $set:
                    {delivery_cost: 15}
            });
        }else {
            const updateFinalOrderDelivery = await FinalOrder.update({_id: finalOrder_id}, {
                $set:
                    {delivery_cost: 0}
            });
        }
            const updateFinalOrderTotal = await FinalOrder.update({ _id : finalOrder_id },{$set:
                    { total : Number(foundFinalOrder.final_price) + Number(finalPrice) + Number(delivery_cost)}});

        //Respond with token
        resp.status(200).json({ "id" : newOrder._id });
    },

    delete: async (req, resp, next) => {
        const  id  = req.value.body.id;
        let delivery_cost = 0;

        const foundItem = await ItemOrder.findOne({ _id : id });
        if(!foundItem) {
            return resp.status(403).json({ error: 'Invalid id!' });
        }

        const foundFinalOrder = await FinalOrder.findOne({ _id : foundItem.finalOrder_id });
        if(!foundFinalOrder) {
            return resp.status(403).json({ error: 'Invalid id!' });
        }
        console.log(foundFinalOrder);
        const updateFinalOrder = await FinalOrder.update({ _id : foundItem.finalOrder_id },{$set:
                { final_price : Number(foundFinalOrder.final_price) - Number(foundItem.finalPrice)}});

        if (!updateFinalOrder) {
            return resp.status(403).json({error: 'Error!'});
        }

        if ( (Number(foundFinalOrder.final_price) - Number(foundItem.finalPrice)) < 100 ) {
            delivery_cost = 15;
            const updateFinalOrderDelivery = await FinalOrder.update({_id: foundItem.finalOrder_id}, {
                $set:
                    {delivery_cost: 15}

            });
        }

        const updateFinalOrderTotal = await FinalOrder.update({ _id : foundItem.finalOrder_id },{$set:
                { total : Number(foundFinalOrder.final_price) - Number(foundItem.finalPrice) + Number(delivery_cost)}
        });


        const deleteItem = await ItemOrder.deleteOne({ _id : id });
        if(!deleteItem) {
            return resp.status(403).json({ error: 'Invalid name!' });
        }

        resp.status(200).json({ deleted: 'yes' });
    }

}