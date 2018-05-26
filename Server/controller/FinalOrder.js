const FinalOrder = require('../Models/FinalOrder');

module.exports = {
    getById: async (req, resp, next) => {
        const  id = req.value.body.id;

        const foundOrder = await FinalOrder.findOne({ _id : id });
        if(!foundOrder) {
            return resp.status(403).json({ error: 'Error!' });
        }

        //Respond with token
        resp.status(200).json({ foundOrder });
    },

    setStatus: async (req, resp, next) => {
        const  id = req.value.body.id;
        const status = req.value.body.other;

        const foundOrder = await FinalOrder.findOne({ _id : id });
        if(!foundOrder) {
            return resp.status(403).json({ error: 'Error!' });
        }

        const updateOrder = await FinalOrder.update({ _id : id },{$set:{ status }});
        if (!updateOrder) {
            return resp.status(403).json({error: 'Error!'});
        }

        //Respond with token
        resp.status(200).json({message: 'Updated!'});
    },

    setDiscount: async (req, resp, next) => {
        const  id = req.value.body.id;
        const discount = req.value.body.other;

        const foundOrder = await FinalOrder.findOne({ _id : id });
        if(!foundOrder) {
            return resp.status(403).json({ error: 'Error!' });
        }

        if(Number(discount) > Number(foundOrder.total)) {
            return resp.status(403).json({ error: 'Error!' });
        }

        if(Number(discount) < 0) {
            return resp.status(403).json({ error: 'Error!' });
        }

        const updateOrder = await FinalOrder.update({ _id : id },{$set:{ discount , total : Number(foundOrder.total) - Number(discount)}});
        if (!updateOrder) {
            return resp.status(403).json({error: 'Error!'});
        }

        //Respond with token
        resp.status(200).json({message: 'Updated!'});
    },

    add: async (req, resp, next) => {
        const  client_id   = req.value.body.id;

        const time_created = new Date().getTime();
        let final_price = 0;
        let delivery_cost = 0;
        const status = "ordered";
        let discount = 0;
        let total = 0;

        const newOrder = new FinalOrder({ client_id , time_created , final_price , delivery_cost , status, discount, total });
        await newOrder.save();

        //Respond with token
        resp.status(200).json({ response : newOrder._id });
    },

    delete: async (req, resp, next) => {
        const  id  = req.value.body.id;

        const foundItem = await FinalOrder.findOne({ _id : id });
        if(!foundItem) {
            return resp.status(403).json({ error: 'Invalid id!' });
        }

        const deleteItem = await FinalOrder.deleteOne({ _id : id });
        if(!deleteItem) {
            return resp.status(403).json({ error: 'Invalid name!' });
        }

        resp.status(200).json({ deleted: 'yes' });
    }

}