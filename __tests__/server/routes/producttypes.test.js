var expect  = require("chai").expect;
var request = require('superagent');

describe("Product Type Tests", function() {

    it("TEST - Add type!", function(done) {
        request.post('localhost:3003/productType/add')
            .set('Content-Type', 'application/json')
            .send({
                "typeName": "Test"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(200);
                done();
            })
    });

    it("TEST - Add already existing type!", function(done) {
        request.post('localhost:3003/productType/add')
            .set('Content-Type', 'application/json')
            .send({
                "typeName": "Test"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(403);
                done();
            })
    });

    it("TEST - Delete type!", function(done) {
        request.post('localhost:3003/productType/delete')
            .set('Content-Type', 'application/json')
            .send({
                "typeName": "Test"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(200);
                done();
            })
    });

    it("TEST - Delete non existing type !", function(done) {
        request.post('localhost:3003/productType/delete')
            .set('Content-Type', 'application/json')
            .send({
                "typeName": "invalid"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(403);
                done();
            })
    });

    it("TEST - Get all types!", function(done) {
        request.get('localhost:3003/productType/getAll')
            .end(function(err,res){
                expect(res.status).to.be.equal(200);
                done();
            })
    });

});
