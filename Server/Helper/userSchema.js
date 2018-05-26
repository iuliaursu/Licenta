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
        setSchema: Joi.object().keys({
            email: Joi.string()
                .required()
                .regex(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),

            other: Joi.string()
                .required()
        }),

        setSchemaSignIn: Joi.object().keys({
            email: Joi.string()
                .required(),

            password: Joi.string()
                .required()
        }),

        getSchema: Joi.object().keys({
            email: Joi.string()
                .required()
                .regex(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
        }),

        loginSchema: Joi.object().keys({
            email: Joi.string()
                      .required()
                      .regex(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),

            password: Joi.string()
                         .required()
                         .min(5)
                         .max(30),

            firstName: Joi.string()
                         .required()
                         .regex(/^[a-zA-Z]{2,}$/),
            lastName:Joi.string()
                         .required()
                         .regex(/^[a-zA-Z]{2,}$/),
            address: Joi.string()
                         .required()
                         .min(10),
            cityName: Joi.string()
                         .required()
                         .regex(/^[a-zA-Z]{2,}$/)
                         .min(2),
            phone: Joi.string()
                         .required()
                         .regex(/^(?:(?:(?:00\s?|\+)40\s?|0)(?:7\d{2}\s?\d{3}\s?\d{3}|(21|31)\d{1}\s?\d{3}\s?\d{3}|((2|3)[3-7]\d{1})\s?\d{3}\s?\d{3}|(8|9)0\d{1}\s?\d{3}\s?\d{3}))$/)
                         .min(10),
            admin: Joi.boolean()
                         .required()
        }),

        countrySchema: Joi.object().keys({
            countryName: Joi.string()
                .required()
                .min(2)
        }),

        citySchema: Joi.object().keys({
            cityName: Joi.string()
                    .required()
                    .min(2),

            countryName: Joi.string()
                    .required()
                    .min(2)
        }),

       cityHelperSchema: Joi.object().keys({
            cityName: Joi.string()
                .required()
                .min(2)
        }),
    }
}