var router = require('express-promise-router')();
var express = require('express');
const { validateBody, schemas } = require('../Helper/userSchema');
const CountryController = require('../controller/countries');

router.route('/add')
    .post(validateBody(schemas.countrySchema), CountryController.add);

router.route('/delete')
    .post(validateBody(schemas.countrySchema), CountryController.delete);

router.route('/getAll')
    .get(CountryController.getAll);

module.exports = router;
