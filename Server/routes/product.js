var router = require('express-promise-router')();
var express = require('express');
const { validateBody, schemas } = require('../Helper/productSchema');
const ProductController = require('../controller/products');

router.route('/add')
    .post(validateBody(schemas.productSchema), ProductController.add);

router.route('/delete')
    .post(validateBody(schemas.nameSchema), ProductController.delete);

router.route('/getByType')
    .post(validateBody(schemas.nameSchema), ProductController.getByType);

router.route('/setPrice')
    .post(validateBody(schemas.setSchema), ProductController.setPrice);

router.route('/setDescription')
    .post(validateBody(schemas.setSchema), ProductController.setDescription);

router.route('/setTypeName')
    .post(validateBody(schemas.setSchema), ProductController.setTypeName);

router.route('/getPrice')
    .post(validateBody(schemas.nameSchema), ProductController.getPrice);

router.route('/getDescription')
    .post(validateBody(schemas.nameSchema), ProductController.getDescription);

router.route('/getTypeName')
    .post(validateBody(schemas.nameSchema), ProductController.getTypeName);

module.exports = router;
