'use strict';
var chai = require('chai');
var ZSchema = require('z-schema');
var customFormats = module.exports = function(zSchema) {
  // Placeholder file for all custom-formats in known to swagger.json
  // as found on
  // https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#dataTypeFormat

  var decimalPattern = /^\d{0,8}.?\d{0,4}[0]+$/;

  /** Validates floating point as decimal / money (i.e: 12345678.123400..) */
  zSchema.registerFormat('double', function(val) {
    return !decimalPattern.test(val.toString());
  });

  /** Validates value is a 32bit integer */
  zSchema.registerFormat('int32', function(val) {
    // the 32bit shift (>>) truncates any bits beyond max of 32
    return Number.isInteger(val) && ((val >> 0) === val);
  });

  zSchema.registerFormat('int64', function(val) {
    return Number.isInteger(val);
  });

  zSchema.registerFormat('float', function(val) {
    // better parsing for custom "float" format
    if (Number.parseFloat(val)) {
      return true;
    } else {
      return false;
    }
  });

  zSchema.registerFormat('date', function(val) {
    // should parse a a date
    return !isNaN(Date.parse(val));
  });

  zSchema.registerFormat('dateTime', function(val) {
    return !isNaN(Date.parse(val));
  });

  zSchema.registerFormat('password', function(val) {
    // should parse as a string
    return typeof val === 'string';
  });
};

customFormats(ZSchema);

var validator = new ZSchema({});
var supertest = require('supertest');
var api = supertest('http://localhost:10010'); // supertest init;
var expect = chai.expect;

describe('/cars', function() {
  describe('get', function() {
    it('should respond with 200 Success', function(done) {
      /*eslint-disable*/
      var schema = {
        "required": [
          "items"
        ],
        "properties": {
          "items": {
            "required": [
              "year",
              "make",
              "model",
              "color",
              "mileage"
            ],
            "properties": {
              "_id": {
                "type": "string"
              },
              "year": {
                "type": "string"
              },
              "make": {
                "type": "string"
              },
              "model": {
                "type": "string"
              },
              "color": {
                "required": [
                  "primary",
                  "secondary"
                ],
                "properties": {
                  "primary": {
                    "type": "string"
                  },
                  "secondary": {
                    "type": "string"
                  }
                }
              },
              "mileage": {
                "type": "number"
              }
            }
          }
        }
      };

      /*eslint-enable*/
      api.get('/cars')
      .set('Content-Type', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);

        expect(validator.validate(res.body, schema)).to.be.true;
        done();
      });
    });

  });

  describe('post', function() {
    it('should respond with 200 Success and a car', function(done) {
      /*eslint-disable*/
      var schema = {
        "required": [
          "year",
          "make",
          "model",
          "color",
          "mileage"
        ],
        "properties": {
          "_id": {
            "type": "string"
          },
          "year": {
            "type": "string"
          },
          "make": {
            "type": "string"
          },
          "model": {
            "type": "string"
          },
          "color": {
            "required": [
              "primary",
              "secondary"
            ],
            "properties": {
              "primary": {
                "type": "string"
              },
              "secondary": {
                "type": "string"
              }
            }
          },
          "mileage": {
            "type": "number"
          }
        }
      };

      /*eslint-enable*/
      api.post('/cars')
      .set('Content-Type', 'application/json')
      .send({"_id":"f2e07d60-5870-11e8-90a6-2db38c8dd3e1","year":"2017","make":"Mazda","model":"CX-5","color":{"primary":"#F00","secondary":"#B4R"},"mileage":3372.96561672098})
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);

        expect(validator.validate(res.body, schema)).to.be.true;
        done();
      });
    });

  });

});
