var router = require('express-promise-router')();
var express = require('express');
const { validateBody, schemas } = require('../Helper/orderSchema');
const ProductController = require('../controller/FinalOrder');

router.route('/add')
    .post(validateBody(schemas.getSchema), ProductController.add);

router.route('/delete')
    .post(validateBody(schemas.getSchema), ProductController.delete);

router.route('/getById')
    .post(validateBody(schemas.getSchema), ProductController.getById);

router.route('/setStatus')
    .post(validateBody(schemas.setSchema), ProductController.setStatus);

router.route('/setDiscount')
    .post(validateBody(schemas.setSchema), ProductController.setDiscount);

module.exports = router;
