var expect  = require("chai").expect;
var request = require('superagent');
var token;

describe("User Tests", function() {
    it("TEST - SignUp - with Correct email and password!", function(done) {
        request.post('localhost:3003/users/signUp')
            .set('Content-Type', 'application/json')
            .send({
                "email": "test@gmail.com",
                "password": "122345",
                "firstName": "abu",
                "lastName": "abu",
                "address": "abu abu abu abu",
                "phone": "0747413945",
                "cityName": "Galati",
                "admin": "false"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(200);
                token = res.body.token;
                done();
            })
    });

    it("TEST - SignUp - Email already exists!", function(done) {
        request.post('localhost:3003/users/signUp')
            .set('Content-Type', 'application/json')
            .send({
                "email": "test@gmail.com",
                "password": "12345",
                "firstName": "abu",
                "lastName": "abu",
                "address": "abu abu abu abu",
                "phone": "0747413945",
                "cityName": "abu",
                "admin": "false"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(403);
                done();
            })
    });

    it("TEST - SignUp - Invalid city!", function(done) {
        request.post('localhost:3003/users/signUp')
            .set('Content-Type', 'application/json')
            .send({
                "email": "test@gmail.com",
                "password": "12345",
                "firstName": "abu",
                "lastName": "abu",
                "address": "abu abu abu abu",
                "phone": "0747413945",
                "cityName": "invalid",
                "admin": "false"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(403);
                done();
            })
    });

    it("TEST - SignIn - Correct email and password!", function(done) {
        request.post('localhost:3003/users/signIn')
            .set('Content-Type', 'application/json')
            .send({
                "email": "test@gmail.com",
                "password": "122345"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(200);
                done();
            })
    });

    it("TEST - SignIn -Invalid email or password!", function(done) {
        request.post('localhost:3003/users/signIn')
            .set('Content-Type', 'application/json')
            .send({
                "email": "test@gmail.com",
                "password": "1223456"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(401);
                done();
            })
    });

    it("TEST - Correct token!", function(done) {
        request.get('localhost:3003/users/secret')
            .set('Authorization', 'jwt '+ token)
            .end(function(err,res){
                expect(res.status).to.be.equal(200);
                done();
            })
    });

    it("TEST - Invalid token!", function(done) {
        request.get('localhost:3003/users/secret')
            .set('Authorization', token)
            .end(function(err,res){
                expect(res.status).to.be.equal(401);
                done();
            })
    });


    it("TEST - Delete - Invalid email !", function(done) {
        request.post('localhost:3003/users/delete')
            .set('Content-Type', 'application/json')
            .send({
                    "email": "invalid@gmail.com",
                })
                .end(function(err,res){
                    expect(res.status).to.be.equal(403);
                    done();
                })
        });

        it("TEST - Delete - Correct email !", function(done) {
            request.post('localhost:3003/users/delete')
                .set('Content-Type', 'application/json')
                .send({
                    "email": "test@gmail.com",
                })
                .end(function(err,res){
                    expect(res.status).to.be.equal(200);
                    done();
                })
        });

    it("TEST - getAdmin !", function(done) {
        request.post('localhost:3003/users/getAdmin')
            .set('Content-Type', 'application/json')
            .send({
                "email": "testul@gmail.com",
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(200);
                done();
            })
    });

    it("TEST - getAdmin invalid email!", function(done) {
        request.post('localhost:3003/users/getAdmin')
            .set('Content-Type', 'application/json')
            .send({
                "email": "invalid@gmail.com",
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(403);
                done();
            })
    });

    it("TEST - getCityName !", function(done) {
        request.post('localhost:3003/users/getCityName')
            .set('Content-Type', 'application/json')
            .send({
                "email": "testul@gmail.com",
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(200);
                done();
            })
    });

    it("TEST - getCityName invalid email!", function(done) {
        request.post('localhost:3003/users/getCityName')
            .set('Content-Type', 'application/json')
            .send({
                "email": "invalid@gmail.com",
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(403);
                done();
            })
    });

    it("TEST - getAddress !", function(done) {
        request.post('localhost:3003/users/getAddress')
            .set('Content-Type', 'application/json')
            .send({
                "email": "testul@gmail.com",
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(200);
                done();
            })
    });

    it("TEST - getAddress invalid email!", function(done) {
        request.post('localhost:3003/users/getAddress')
            .set('Content-Type', 'application/json')
            .send({
                "email": "invalid@gmail.com",
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(403);
                done();
            })
    });

    it("TEST - getLastName !", function(done) {
        request.post('localhost:3003/users/getLastName')
            .set('Content-Type', 'application/json')
            .send({
                "email": "testul@gmail.com",
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(200);
                done();
            })
    });

    it("TEST - getLastName invalid email!", function(done) {
        request.post('localhost:3003/users/getLastName')
            .set('Content-Type', 'application/json')
            .send({
                "email": "invalid@gmail.com",
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(403);
                done();
            })
    });

    it("TEST - getFirstName !", function(done) {
        request.post('localhost:3003/users/getFirstName')
            .set('Content-Type', 'application/json')
            .send({
                "email": "testul@gmail.com",
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(200);
                done();
            })
    });

    it("TEST - getFirstName invalid email!", function(done) {
        request.post('localhost:3003/users/getFirstName')
            .set('Content-Type', 'application/json')
            .send({
                "email": "invalid@gmail.com",
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(403);
                done();
            })
    });

    it("TEST - getPassword !", function(done) {
        request.post('localhost:3003/users/getPassword')
            .set('Content-Type', 'application/json')
            .send({
                "email": "testul@gmail.com",
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(200);
                done();
            })
    });

    it("TEST - getPassword invalid email!", function(done) {
        request.post('localhost:3003/users/getPassword')
            .set('Content-Type', 'application/json')
            .send({
                "email": "invalid@gmail.com",
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(403);
                done();
            })
    });

    it("TEST - getPhone !", function(done) {
        request.post('localhost:3003/users/getPhone')
            .set('Content-Type', 'application/json')
            .send({
                "email": "testul@gmail.com",
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(200);
                done();
            })
    });

    it("TEST - getPhone invalid email!", function(done) {
        request.post('localhost:3003/users/getPhone')
            .set('Content-Type', 'application/json')
            .send({
                "email": "invalid@gmail.com",
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(403);
                done();
            })
    });

    it("TEST - setPhone !", function(done) {
        request.post('localhost:3003/users/setPhone')
            .set('Content-Type', 'application/json')
            .send({
                "email": "testul@gmail.com",
                "other": "0747413944"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(200);
                done();
            })
    });

    it("TEST - setPhone invalid email!", function(done) {
        request.post('localhost:3003/users/setPhone')
            .set('Content-Type', 'application/json')
            .send({
                "email": "invalid@gmail.com",
                "other": "0747413944"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(403);
                done();
            })
    });

    it("TEST - setAddress !", function(done) {
        request.post('localhost:3003/users/setAddress')
            .set('Content-Type', 'application/json')
            .send({
                "email": "testul@gmail.com",
                "other": "micro 20"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(200);
                done();
            })
    });

    it("TEST - setAddress invalid email!", function(done) {
        request.post('localhost:3003/users/setAddress')
            .set('Content-Type', 'application/json')
            .send({
                "email": "invalid@gmail.com",
                "other": "micro 20"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(403);
                done();
            })
    });

    it("TEST - setCityName !", function(done) {
        request.post('localhost:3003/users/setCityName')
            .set('Content-Type', 'application/json')
            .send({
                "email": "testul@gmail.com",
                "other": "Galati"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(200);
                done();
            })
    });

    it("TEST - setCityName invalid email !", function(done) {
        request.post('localhost:3003/users/setCityName')
            .set('Content-Type', 'application/json')
            .send({
                "email": "invalid@gmail.com",
                "other": "Galati"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(403);
                done();
            })
    });

    it("TEST - setCityName invalid city !", function(done) {
        request.post('localhost:3003/users/setCityName')
            .set('Content-Type', 'application/json')
            .send({
                "email": "testul@gmail.com",
                "other": "invalid"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(403);
                done();
            })
    });

    it("TEST - setLastName !", function(done) {
        request.post('localhost:3003/users/setLastName')
            .set('Content-Type', 'application/json')
            .send({
                "email": "testul@gmail.com",
                "other": "aburamal abu"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(200);
                done();
            })
    });

    it("TEST - setLastName invalid email!", function(done) {
        request.post('localhost:3003/users/setLastName')
            .set('Content-Type', 'application/json')
            .send({
                "email": "invalid@gmail.com",
                "other": "aburamal abu"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(403);
                done();
            })
    });

    it("TEST - setFirstName !", function(done) {
        request.post('localhost:3003/users/setFirstName')
            .set('Content-Type', 'application/json')
            .send({
                "email": "testul@gmail.com",
                "other": "aburamal"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(200);
                done();
            })
    });

    it("TEST - setFirstName invalid email!", function(done) {
        request.post('localhost:3003/users/setFirstName')
            .set('Content-Type', 'application/json')
            .send({
                "email": "invalid@gmail.com",
                "other": "aburamal"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(403);
                done();
            })
    });

    it("TEST - setPassword !", function(done) {
        request.post('localhost:3003/users/setPassword')
            .set('Content-Type', 'application/json')
            .send({
                "email": "testul@gmail.com",
                "other": "456789"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(200);
                done();
            })
    });

    it("TEST - setPassword invalid email!", function(done) {
        request.post('localhost:3003/users/setPassword')
            .set('Content-Type', 'application/json')
            .send({
                "email": "invalid@gmail.com",
                "other": "456789"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(403);
                done();
            })
    });

    it("TEST - setAdmin !", function(done) {
        request.post('localhost:3003/users/setAdmin')
            .set('Content-Type', 'application/json')
            .send({
                "email": "testul@gmail.com",
                "other": "true"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(200);
                done();
            })
    });

    it("TEST - setAdmin invalid email!", function(done) {
        request.post('localhost:3003/users/setAdmin')
            .set('Content-Type', 'application/json')
            .send({
                "email": "invalid@gmail.com",
                "other": "true"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(403);
                done();
            })
    });

    });
