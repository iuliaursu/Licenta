var expect  = require("chai").expect;
var request = require('superagent');

describe("Product Tests", function() {

    it("TEST - Add Product!", function(done) {
        request.post('localhost:3003/product/add')
            .set('Content-Type', 'application/json')
            .send({
                "typeName": "Asternut",
                "name": "Test",
                "description": "test",
                "price": "25 lei"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(200);
                done();
            })
    });

    it("TEST - Add already existing product!", function(done) {
        request.post('localhost:3003/product/add')
            .set('Content-Type', 'application/json')
            .send({
                "typeName": "Asternut",
                "name": "Test",
                "description": "test",
                "price": "25 lei"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(403);
                done();
            })
    });

    it("TEST - Add product with invalid type !", function(done) {
        request.post('localhost:3003/product/add')
            .set('Content-Type', 'application/json')
            .send({
                "typeName": "invalid",
                "name": "Test",
                "description": "test",
                "price": "25 lei"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(403);
                done();
            })
    });

    it("TEST - Get all products by type!", function(done) {
        request.post('localhost:3003/product/getByType')
            .set('Content-Type', 'application/json')
            .send({
                "name": "Asternut"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(200);
                done();
            })
    });

    it("TEST - setPrice !", function(done) {
        request.post('localhost:3003/product/setPrice')
            .set('Content-Type', 'application/json')
            .send({
                "name": "Test",
                "other": "65 lei"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(200);
                done();
            })
    });

    it("TEST - setPrice invalid name!", function(done) {
        request.post('localhost:3003/product/setPrice')
            .set('Content-Type', 'application/json')
            .send({
                "name": "invalid",
                "other": "65 lei"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(403);
                done();
            })
    });

    it("TEST - setDescription !", function(done) {
        request.post('localhost:3003/product/setDescription')
            .set('Content-Type', 'application/json')
            .send({
                "name": "Test",
                "other": "65 lei"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(200);
                done();
            })
    });

    it("TEST - setDescription invalid name!", function(done) {
        request.post('localhost:3003/product/setDescription')
            .set('Content-Type', 'application/json')
            .send({
                "name": "invalid",
                "other": "test"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(403);
                done();
            })
    });

    it("TEST - setTypeName !", function(done) {
        request.post('localhost:3003/product/setTypeName')
            .set('Content-Type', 'application/json')
            .send({
                "name": "Test",
                "other": "Asternut"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(200);
                done();
            })
    });

    it("TEST - setTypeName invalid name!", function(done) {
        request.post('localhost:3003/product/setTypeName')
            .set('Content-Type', 'application/json')
            .send({
                "name": "invalid",
                "other": "65 lei"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(403);
                done();
            })
    });

    it("TEST - setTypeName invalid type!", function(done) {
        request.post('localhost:3003/product/setTypeName')
            .set('Content-Type', 'application/json')
            .send({
                "name": "invalid",
                "other": "invalid"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(403);
                done();
            })
    });

    it("TEST - getPrice !", function(done) {
        request.post('localhost:3003/product/getPrice')
            .set('Content-Type', 'application/json')
            .send({
                "name": "Test",
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(200);
                done();
            })
    });

    it("TEST - getPrice invalid name!", function(done) {
        request.post('localhost:3003/product/getPrice')
            .set('Content-Type', 'application/json')
            .send({
                "name": "invalid",
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(403);
                done();
            })
    });

    it("TEST - getTypeName !", function(done) {
        request.post('localhost:3003/product/getTypeName')
            .set('Content-Type', 'application/json')
            .send({
                "name": "Test",
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(200);
                done();
            })
    });

    it("TEST - getTypeName invalid name!", function(done) {
        request.post('localhost:3003/product/getTypeName')
            .set('Content-Type', 'application/json')
            .send({
                "name": "invalid",
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(403);
                done();
            })
    });

    it("TEST - getDescription !", function(done) {
        request.post('localhost:3003/product/getDescription')
            .set('Content-Type', 'application/json')
            .send({
                "name": "Test",
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(200);
                done();
            })
    });

    it("TEST - getDescription invalid name!", function(done) {
        request.post('localhost:3003/product/getDescription')
            .set('Content-Type', 'application/json')
            .send({
                "name": "invalid",
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(403);
                done();
            })
    });

    it("TEST - Delete product!", function(done) {
        request.post('localhost:3003/product/delete')
            .set('Content-Type', 'application/json')
            .send({
                "name": "Test"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(200);
                done();
            })
    });

    it("TEST - Delete non existing product !", function(done) {
        request.post('localhost:3003/product/delete')
            .set('Content-Type', 'application/json')
            .send({
                "name": "invalid"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(403);
                done();
            })
    });

});
