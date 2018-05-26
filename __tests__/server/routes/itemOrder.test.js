var expect  = require("chai").expect;
var request = require('superagent');
var finalOrderId;
var id;

describe("Item Order Tests", function() {

    it("TEST - Add Stock!", function(done) {
        request.post('localhost:3003/stocks/add')
            .set('Content-Type', 'application/json')
            .send({
                "product_id": "5afaa0911a05260678c0da13",
                "stock": "55"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(200);
                done();
            })
    });

    it("TEST - Add Final Order!", function(done) {
        request.post('localhost:3003/FinalOrder/add')
            .set('Content-Type', 'application/json')
            .send({
                "id": "5af993b7a131e80814b5a3d3"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(200);
                finalOrderId = res.body.response;
                done();
            })
    });

    it("TEST - Add Order with 2 items!", function(done) {
        request.post('localhost:3003/ItemOrder/add')
            .set('Content-Type', 'application/json')
            .send({
                "finalOrder_id": finalOrderId,
                "product_id": "5afaa0911a05260678c0da13",
                "quantity": "2"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(200);
                id = res.body.id;
                done();
            })
    });

    it("TEST - Check Final order 2 items!", function(done) {
        request.post('localhost:3003/FinalOrder/getById')
            .set('Content-Type', 'application/json')
            .send({
                "id": finalOrderId,
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(200);
                expect(res.body.foundOrder.delivery_cost).to.be.equal("15");
                expect(res.body.foundOrder.final_price).to.be.equal("70");
                expect(res.body.foundOrder.total).to.be.equal("85");
                done();
            })
    });

    
    it("TEST - Check order price !", function(done) {
        request.post('localhost:3003/ItemOrder/getById')
            .set('Content-Type', 'application/json')
            .send({
                "id": id,
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(200);
                expect(Number(res.body.foundOrder.finalPrice)).to.be.equal(70);
                done();
            })
    });

    it("TEST - getStock after order !", function(done) {
        request.post('localhost:3003/stocks/getStock')
            .set('Content-Type', 'application/json')
            .send({
                "product_id": "5afaa0911a05260678c0da13"
            })
            .end(function(err,res){
                expect(res.body.stock).to.be.equal(53);
                done();
            })
    });

    it("TEST - Add Order with out of stock quantity!", function(done) {
        request.post('localhost:3003/ItemOrder/add')
            .set('Content-Type', 'application/json')
            .send({
                "finalOrder_id": "00",
                "product_id": "5afaa0911a05260678c0da13",
                "quantity": "80"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(403);
                done();
            })
    });

    it("TEST - Add Order with negative quantity!", function(done) {

        request.post('localhost:3003/ItemOrder/add')
            .set('Content-Type', 'application/json')
            .send({
                "finalOrder_id": "00",
                "product_id": "5afaa0911a05260678c0da13",
                "quantity": "-80"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(403);
                done();
            })
    });

    it("TEST - setQuantity  20 items!", function(done) {
        request.post('localhost:3003/ItemOrder/setQuantity')
            .set('Content-Type', 'application/json')
            .send({
                "id": id,
                "other": "20"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(200);
                done();
            })
    });

    it("TEST - Check Final order 20 items!", function(done) {
        request.post('localhost:3003/FinalOrder/getById')
            .set('Content-Type', 'application/json')
            .send({
                "id": finalOrderId,
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(200);
                expect(res.body.foundOrder.delivery_cost).to.be.equal("0");
                expect(res.body.foundOrder.final_price).to.be.equal("700");
                expect(res.body.foundOrder.total).to.be.equal("700");
                done();
            })
    });


    it("TEST - setQuantity  out of stock!", function(done) {
        request.post('localhost:3003/ItemOrder/setQuantity')
            .set('Content-Type', 'application/json')
            .send({
                "id": id,
                "other": "110"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(403);
                done();
            })
    });

    it("TEST - setQuantity  negative amount!", function(done) {
        request.post('localhost:3003/ItemOrder/setQuantity')
            .set('Content-Type', 'application/json')
            .send({
                "id": id,
                "other": "-110"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(403);
                done();
            })
    });

    it("TEST - Check order price after quantity update !", function(done) {
        request.post('localhost:3003/ItemOrder/getById')
            .set('Content-Type', 'application/json')
            .send({
                "id": id,
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(200);
                expect(Number(res.body.foundOrder.finalPrice)).to.be.equal(700);
                done();
            })
    });

    it("TEST - getStock after changing order quantity !", function(done) {
        request.post('localhost:3003/stocks/getStock')
            .set('Content-Type', 'application/json')
            .send({
                "product_id": "5afaa0911a05260678c0da13"
            })
            .end(function(err,res){
                expect(res.body.stock).to.be.equal(35);
                done();
            })
    });

    it("TEST - setQuantity invalid id!", function(done) {
        request.post('localhost:3003/ItemOrder/setQuantity')
            .set('Content-Type', 'application/json')
            .send({
                "id": "5afec7e965df7d1d0ca6af88",
                "other": "test"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(403);
                done();
            })
    });

    it("TEST - getOrder !", function(done) {
        request.post('localhost:3003/ItemOrder/getById')
            .set('Content-Type', 'application/json')
            .send({
                "id": id,
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(200);
                done();
            })
    });

    it("TEST - getOrder invalid id!", function(done) {
        request.post('localhost:3003/ItemOrder/getById')
            .set('Content-Type', 'application/json')
            .send({
                "id": "5afec7e965df7d1d0ca6af88",
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(403);
                done();
            })
    });

    it("TEST - Set discount!", function(done) {
        request.post('localhost:3003/FinalOrder/setDiscount')
            .set('Content-Type', 'application/json')
            .send({
                "id": finalOrderId,
                "other" : "20"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(200);
                done();
            })
    });

    it("TEST - Set invalid discount!", function(done) {
        request.post('localhost:3003/FinalOrder/setDiscount')
            .set('Content-Type', 'application/json')
            .send({
                "id": finalOrderId,
                "other" : "800"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(403);
                done();
            })
    });

    it("TEST - Set negative discount!", function(done) {
        request.post('localhost:3003/FinalOrder/setDiscount')
            .set('Content-Type', 'application/json')
            .send({
                "id": finalOrderId,
                "other" : "-80"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(403);
                done();
            })
    });


    it("TEST - Set status!", function(done) {
        request.post('localhost:3003/FinalOrder/setStatus')
            .set('Content-Type', 'application/json')
            .send({
                "id": finalOrderId,
                "other" : "received"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(200);
                done();
            })
    });


    it("TEST - Check Final order after setting discount!", function(done) {
        request.post('localhost:3003/FinalOrder/getById')
            .set('Content-Type', 'application/json')
            .send({
                "id": finalOrderId,
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(200);
                expect(res.body.foundOrder.delivery_cost).to.be.equal("0");
                expect(res.body.foundOrder.final_price).to.be.equal("700");
                expect(res.body.foundOrder.total).to.be.equal("680");
                done();
            })
    });

    it("TEST - Delete order!", function(done) {
        request.post('localhost:3003/ItemOrder/delete')
            .set('Content-Type', 'application/json')
            .send({
                "id": id
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(200);
                done();
            })
    });

    it("TEST - Check Final order after order delete!", function(done) {
        request.post('localhost:3003/FinalOrder/getById')
            .set('Content-Type', 'application/json')
            .send({
                "id": finalOrderId,
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(200);
                expect(res.body.foundOrder.delivery_cost).to.be.equal("15");
                expect(res.body.foundOrder.final_price).to.be.equal("0");
                expect(res.body.foundOrder.total).to.be.equal("15");
                done();
            })
    });

    it("TEST - Delete non existing order !", function(done) {
        request.post('localhost:3003/ItemOrder/delete')
            .set('Content-Type', 'application/json')
            .send({
                "id": "5afec7e965df7d1d0ca6af8a"
            })
            .end(function(err,res){
                expect(res.status).to.be.equal(403);
                done();
            })
    });

});
