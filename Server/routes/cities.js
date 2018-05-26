var express = require('express');
var router = express.Router();
const { validateBody, schemas } = require('../Helper/userSchema');
const CityController = require('../controller/cities');

router.route('/add')
    .post(validateBody(schemas.citySchema), CityController.add);

router.route('/delete')
    .post(validateBody(schemas.cityHelperSchema), CityController.delete);

router.route('/getByCountry')
    .post(validateBody(schemas.countrySchema), CityController.getByCountry);

module.exports = router;