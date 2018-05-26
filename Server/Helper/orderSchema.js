const Joi = require('joi');

module.exports = {

    validateBody: (schema) => {
        return (req, resp, next) => {
            const result = Joi.validate(req.body, schema);

            if (result.error){
                return resp.status(400).json(result.error);
            }

            if (!req.value) { req.value = {}; }
            req.value['body'] = result.value;
            next();
        }

    },

    schemas: {
        getSchema: Joi.object().keys({
            id: Joi.string()
                .required()
                .min(2)
        }),
        setSchema: Joi.object().keys({
            id: Joi.string()
                .required()
                .min(2),
            other: Joi.string()
                .required()
                .min(1)
        }),
        itemOrderSchema: Joi.object().keys({
            finalOrder_id: Joi.string()
                .required()
                .min(2),
            product_id: Joi.string()
                .required()
                .min(2),
            quantity: Joi.string()
                .required()
                .min(1)
    }),
        finalOrderSchema: Joi.object().keys({
            client_id: Joi.string()
                .required()
                .min(2),
            time_created: Joi.string()
                .required()
                .min(2),
            delivery_cost: Joi.string()
                .required()
                .min(1),
            discount: Joi.string()
                .required()
                .min(1),
            status: Joi.string()
                .required()
                .min(1),
            total: Joi.string()
                .required()
                .min(1),
            finalPrice: Joi.string()
                .required()
                .min(1)
        })
    }
}