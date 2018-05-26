var expect  = require("chai").expect;
var request = require('superagent');

describe("Stock Tests", function() {

    it("TEST - Add already existing stock!", function(done) {
        request.post('localhost:3003/stocks/add')
            .set('Content-Type', 'application/json')
            .send({
                "product_id": "5afaa0911a05260678c0da13",
                "stock": "55"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(403);
                done();
            })
    });

    it("TEST - Add stock with invalid product_id!", function(done) {
        request.post('localhost:3003/stocks/add')
            .set('Content-Type', 'application/json')
            .send({
                "product_id": "5afaa0911a06260678c0da13",
                "stock": "55"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(403);
                done();
            })
    });

    it("TEST - setStock !", function(done) {
        request.post('localhost:3003/stocks/setStock')
            .set('Content-Type', 'application/json')
            .send({
                "product_id": "5afaa0911a05260678c0da13",
                "stock": "60"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(200);
                done();
            })
    });

    it("TEST - setStock invalid product_id!", function(done) {
        request.post('localhost:3003/stocks/setStock')
            .set('Content-Type', 'application/json')
            .send({
                "product_id": "5afaa0911a06260678c0da13",
                "stock": "55"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(403);
                done();
            })
    });

    it("TEST - getStock invalid product_id!", function(done) {
        request.post('localhost:3003/stocks/getStock')
            .set('Content-Type', 'application/json')
            .send({
                "product_id": "5afaa0911a06260678c0da13"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(403);
                done();
            })
    });

    it("TEST - Delete stock!", function(done) {
        request.post('localhost:3003/stocks/delete')
            .set('Content-Type', 'application/json')
            .send({
                "product_id": "5afaa0911a05260678c0da13"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(200);
                done();
            })
    });

    it("TEST - Delete non existing stock !", function(done) {
        request.post('localhost:3003/stocks/delete')
            .set('Content-Type', 'application/json')
            .send({
                "product_id": "5afaa0911a06260678c0da13"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(403);
                done();
            })
    });

});
