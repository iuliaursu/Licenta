var router = require('express-promise-router')();
var express = require('express');
const { validateBody, schemas } = require('../Helper/productSchema');
const StockController = require('../controller/stock');

router.route('/add')
    .post(validateBody(schemas.stockSchema), StockController.add);

router.route('/delete')
    .post(validateBody(schemas.stockHelperSchema), StockController.delete);

router.route('/setStock')
    .post(validateBody(schemas.stockSchema), StockController.setStock);

router.route('/getStock')
    .post(validateBody(schemas.stockHelperSchema), StockController.getStock);

module.exports = router;
