var expect  = require("chai").expect;
var request = require('superagent');

describe("Cities Tests", function() {

    it("TEST - Add city!", function(done) {
        request.post('localhost:3003/cities/add')
            .set('Content-Type', 'application/json')
            .send({
                "cityName": "Braila",
                "countryName": "Romania"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(200);
                done();
            })
    });

    it("TEST - Add already existing city!", function(done) {
        request.post('localhost:3003/cities/add')
            .set('Content-Type', 'application/json')
            .send({
                "cityName": "Braila",
                "countryName": "Romania"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(403);
                done();
            })
    });

    it("TEST - Add city to invalid country!", function(done) {
        request.post('localhost:3003/cities/add')
            .set('Content-Type', 'application/json')
            .send({
                "cityName": "Braila",
                "countryName": "invalid"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(403);
                done();
            })
    });

    it("TEST - Delete city!", function(done) {
        request.post('localhost:3003/cities/delete')
            .set('Content-Type', 'application/json')
            .send({
                "cityName": "Braila"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(200);
                done();
            })
    });

    it("TEST - Delete non existing city !", function(done) {
        request.post('localhost:3003/cities/delete')
            .set('Content-Type', 'application/json')
            .send({
                "cityName": "invalid"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(403);
                done();
            })
    });

    it("TEST - Get by country test!", function(done) {
        request.post('localhost:3003/cities/getByCountry')
            .set('Content-Type', 'application/json')
            .send({
                "countryName": "Romania"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(200);
                done();
            })
    });

    it("TEST - Get by invalid country test!", function(done) {
        request.post('localhost:3003/cities/getByCountry')
            .set('Content-Type', 'application/json')
            .send({
                "countryName": "invalid"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(403);
                done();
            })
    });


});