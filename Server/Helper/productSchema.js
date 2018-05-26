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
        stockSchema: Joi.object().keys({
            product_id: Joi.string()
                .required()
                .min(2),
            stock: Joi.string()
                .required()
                .min(2)
        }),
        stockHelperSchema: Joi.object().keys({
            product_id: Joi.string()
                .required()
                .min(2)
        }),
        nameSchema: Joi.object().keys({
            name: Joi.string()
                .required()
                .min(2)
        }),
        setSchema: Joi.object().keys({
            name: Joi.string()
                .required()
                .min(2),
            other: Joi.string()
                .required()
                .min(2)
        }),
        productTypeSchema: Joi.object().keys({
            typeName: Joi.string()
                .required()
                .min(2)
        }),
        productSchema: Joi.object().keys({
            name: Joi.string()
                .required()
                .min(2),
            description: Joi.string()
                .required()
                .min(2),
            typeName: Joi.string()
                .required()
                .min(2),
            price: Joi.string()
                .required()
                .min(1)
        })
    }
}