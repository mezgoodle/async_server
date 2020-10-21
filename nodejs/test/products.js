'use strict';
//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const Product = require('../models/productModel');

//Подключаем dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);
// Our main block
describe('Products', () => {
  /*
  * Test for /GET
  */
  describe('/GET product', () => {
    const numProducts = 5;
    it('it should GET all the products', done => {
      chai.request(server)
        .get('/api/products')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(numProducts);
          done();
        });
    });
  });

});
