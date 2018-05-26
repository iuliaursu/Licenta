var router = require('express-promise-router')();
var express = require('express');
const { validateBody, schemas } = require('../Helper/productSchema');
const ProductTypeController = require('../controller/productType');

router.route('/add')
    .post(validateBody(schemas.productTypeSchema), ProductTypeController.add);

router.route('/delete')
    .post(validateBody(schemas.productTypeSchema), ProductTypeController.delete);

router.route('/getAll')
    .get(ProductTypeController.getAll);

module.exports = router;
