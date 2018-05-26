var router = require('express-promise-router')();
var express = require('express');
const { validateBody, schemas } = require('../Helper/orderSchema');
const ProductController = require('../controller/ItemOrder');

router.route('/add')
    .post(validateBody(schemas.itemOrderSchema), ProductController.add);

router.route('/delete')
    .post(validateBody(schemas.getSchema), ProductController.delete);

router.route('/getById')
    .post(validateBody(schemas.getSchema), ProductController.getById);

router.route('/setQuantity')
    .post(validateBody(schemas.setSchema), ProductController.setQuantity);

module.exports = router;
