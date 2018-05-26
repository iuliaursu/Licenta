var router = require('express-promise-router')();
var express = require('express');
const passport = require('passport');
const { validateBody, schemas } = require('../Helper/userSchema');
const UsersController = require('../controller/users');
const passportConf = require('../passport');

router.route('/signUp')
    .post(validateBody(schemas.loginSchema), UsersController.signUp);

router.route('/signIn')
    .post(validateBody(schemas.setSchemaSignIn), passport.authenticate('local', {session: false}), UsersController.signIn);

router.route('/secret')
    .get( passport.authenticate('jwt', {session: false}), UsersController.secret);

router.route('/getAdmin')
    .post(validateBody(schemas.getSchema), UsersController.getAdmin);

router.route('/getCityName')
    .post(validateBody(schemas.getSchema), UsersController.getCityName);

router.route('/getAddress')
    .post(validateBody(schemas.getSchema), UsersController.getAddress);

router.route('/getLastName')
    .post(validateBody(schemas.getSchema), UsersController.getLastName);

router.route('/getFirstName')
    .post(validateBody(schemas.getSchema), UsersController.getFirstName);

router.route('/getPhone')
    .post(validateBody(schemas.getSchema), UsersController.getPhone);

router.route('/getPassword')
    .post(validateBody(schemas.getSchema), UsersController.getPassword);

router.route('/delete')
    .post(validateBody(schemas.getSchema), UsersController.delete);

router.route('/setPassword')
    .post(validateBody(schemas.setSchema), UsersController.setPassword);

router.route('/setPhone')
    .post(validateBody(schemas.setSchema), UsersController.setPhone);

router.route('/setFirstName')
    .post(validateBody(schemas.setSchema), UsersController.setFirstName);

router.route('/setLastName')
    .post(validateBody(schemas.setSchema), UsersController.setLastName);

router.route('/setAddress')
    .post(validateBody(schemas.setSchema), UsersController.setAddress);

router.route('/setCityName')
    .post(validateBody(schemas.setSchema), UsersController.setCityName);

router.route('/setAdmin')
    .post(validateBody(schemas.setSchema), UsersController.setAdmin);

module.exports = router;
