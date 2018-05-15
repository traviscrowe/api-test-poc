'use-strict'

let fs = require('fs');
var stt = require('swagger-test-templates');
var parser = require('swagger-parser');
return parser.dereference('api/swagger/swagger.yaml').then(api => {
    var config = {
        assertionFormat: 'expect',
        testModule: 'supertest',
        pathName: ['/hello', '/cars', '/cars/{id}'],
        maxLen: 120,
        requestData: {
            '/hello': {
                get: {
                    '200': [{ name: 'Travis', description: 'a name' }]
                }
            },
            '/cars/{id}': {
                get: {
                    '200': [{
                        id: 'b3cc2e00-57b5-11e8-9806-65cd416cc985',
                        description: 'a car id'
                    }],
                    '404': [{
                        id: 'fakeId',
                        description: 'a car'
                    }]
                },
                put: {
                    '200': [
                        {
                            id: 'b3cc2e00-57b5-11e8-9806-65cd416cc985',
                            body: {
                                year: '2017',
                                make: "Mazda",
                                model: "CX-5",
                                color: {
                                    primary: '#F00',
                                    secondary: '#B4R'
                                },
                                mileage: Math.random() * 10000
                            },
                            description: 'a car'
                        }
                    ],
                    '404': [
                        {
                            id: 'fakeId',
                            body: {
                                year: '2017',
                                make: "Mazda",
                                model: "CX-5",
                                color: {
                                    primary: '#F00',
                                    secondary: '#B4R'
                                },
                                mileage: Math.random() * 10000
                            },
                            description: 'a car'
                        }
                    ]
                },
                delete: {
                    '200': [{
                        id: 'f2e07d60-5870-11e8-90a6-2db38c8dd3e1',
                        description: 'a car id'
                    }],
                    '404': [{
                        id: 'fakeId',
                        description: 'a car id'
                    }]
                },
            },
            '/cars': {
                post: {
                    '200': [{
                        body: {
                            _id: 'f2e07d60-5870-11e8-90a6-2db38c8dd3e1',
                            year: '2017',
                            make: "Mazda",
                            model: "CX-5",
                            color: {
                                primary: '#F00',
                                secondary: '#B4R'
                            },
                            mileage: Math.random() * 10000
                        },
                        description: 'a car'
                    }],
                }
            }
        }
      };
      
      var tests = stt.testGen(api, config);
      tests.forEach(file => {
          const fileName = `test/swagger-test-templates/test/${file.name}`;
          fs.writeFileSync(fileName, file.test);
      });
      return 0;
});