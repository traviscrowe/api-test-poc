'use strict'

var SwaggerParser = require('swagger-parser');
var parser = new SwaggerParser();
var hippie = require('hippie');
var app = require('../../app');
var expect = require('chai').expect;
var path = require('path');
var swagger;

describe('api', function() {
    before(function (done) {
        parser.dereference(path.join(__dirname, '../../api/swagger/swagger.yaml'), function (err, api) {
            if (err) return done(err);
            swagger = api;
            done();
        });
    });

    describe('/cars/{id}', function () {
        describe('get', function () {
            it('should respond with 200', function (done) {
                hippie(app, swagger)
                    .get('/cars/bc658950-57b8-11e8-9cfa-aded4da2e135')
                    .expectStatus(200)
                    .end(done);
            });

            it('should respond with 404', function(done) {
                hippie(app, swagger)
                    .get('/cars/fakeId')
                    .expectStatus(404)
                    .end(done)
            });
        });

        describe('put', function() {
            it('should respond with 200', function(done) {
                hippie(app, swagger)
                    .json()
                    .put('/cars/bc658950-57b8-11e8-9cfa-aded4da2e135')
                    .send({"year":"2017","make":"Mazda","model":"CX-5","color":{"primary":"#F00","secondary":"#B4R"},"mileage":7478.081694229355})
                    .expectStatus(200)
                    .end(done);
            });

            it('should respond with 404', function(done) {
                hippie(app, swagger)
                    .json()
                    .put('/cars/fakeId')
                    .send({"year":"2017","make":"Mazda","model":"CX-5","color":{"primary":"#F00","secondary":"#B4R"},"mileage":7478.081694229355})
                    .expectStatus(404)
                    .end(done)
            });
        });

        describe('delete', function() {
            it('should respond with 404', function(done) {
                hippie(app, swagger)
                    .del('/cars/fakeId')
                    .expectStatus(404)
                    .end(done);
            });
        });
    });

    describe('/cars', function() {
        describe('get', function() {
            it('should respond with 200', function(done) {
                hippie(app, swagger)
                    .get('/cars')
                    .expectStatus(200)
                    .end(done)
            });
        });

        describe('post', function() {
            it('should respond with 200', function(done) {
                hippie(app, swagger)
                    .json()
                    .post('/cars')
                    .send({"year":"2017","make":"Mazda","model":"CX-5","color":{"primary":"#F00","secondary":"#B4R"},"mileage":7478.081694229355})
                    .expectStatus(200)
                    .end(done);
            });
        });
    });
});