'use strict'

var SwaggerParser = require('swagger-parser');
var parser = new SwaggerParser();
var hippie = require('hippie');
var app = require('../../app');
var expect = require('chai').expect;
var path = require('path');
var dereferencedSwagger;

describe('/cars/{id}', function () {
  this.timeout(10000);

    before(function (done) {
        parser.dereference(path.join(__dirname, '../../api/swagger/swagger.yaml'), function (err, api) {
            if (err) return done(err);
            dereferencedSwagger = api;
            done();
        })
    })

    describe('get', function () {
        it('should respond with 200', function (done) {
            hippie(app, dereferencedSwagger)
            .get('/cars/{id}')
            .pathParams({
                id: 'bc658950-57b8-11e8-9cfa-aded4da2e135'
            })
            .expectStatus(200)
            .end(done)
        });
    });

    describe('put', function() {
        it('should respond with 200', function(done) {
            hippie(app. dereferencedSwagger)
                .put('/cars/{id}')
                .pathParams({
                    id: 'bc658950-57b8-11e8-9cfa-aded4da2e135'
                })
                .send({"year":"2017","make":"Mazda","model":"CX-5","color":{"primary":"#F00","secondary":"#B4R"},"mileage":7478.081694229355})
                .expectStatus(200)
                .end(done)
        });
    });
});

describe('/cars', function() {
    describe('get', function() {
        it('should respond with 200', function(done) {
            hippie(app, dereferencedSwagger)
                .get('/cars')
                .expectStatus(200)
                .end(done)
        });
    });
});
