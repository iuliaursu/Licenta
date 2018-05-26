var expect  = require("chai").expect;
var request = require('superagent');

describe("Countries Tests", function() {

    it("TEST - Add country!", function(done) {
        request.post('localhost:3003/countries/add')
            .set('Content-Type', 'application/json')
            .send({
                "countryName": "Test"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(200);
                done();
            })
    });

    it("TEST - Add already existing country!", function(done) {
        request.post('localhost:3003/countries/add')
            .set('Content-Type', 'application/json')
            .send({
                "countryName": "Test"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(403);
                done();
            })
    });

    it("TEST - Delete country!", function(done) {
        request.post('localhost:3003/countries/delete')
            .set('Content-Type', 'application/json')
            .send({
                "countryName": "Test"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(200);
                done();
            })
    });

    it("TEST - Delete non existing country !", function(done) {
        request.post('localhost:3003/countries/delete')
            .set('Content-Type', 'application/json')
            .send({
                "countryName": "invalid"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(403);
                done();
            })
    });

    it("TEST - Get all countries!", function(done) {
        request.get('localhost:3003/countries/getAll')
            .end(function(err,res){
                expect(res.status).to.be.equal(200);
                done();
            })
    });

});
