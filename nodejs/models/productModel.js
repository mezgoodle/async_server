'use strict';

const products = require('../data/products.json');
const { writeDataToFile, getRandomInt } = require('../utils');

const findAll = () => {
  return new Promise((resolve, reject) => {
    resolve(products)
  })
}

const findById = (id) => {
  return new Promise((resolve, reject) => {
    const product = products.find((p) => p.id === id);
    resolve(product);
  })
}

const create = (product) => {
  return new Promise((resolve, reject) => {
    const maxId = 10000;
    const newProduct = {id: getRandomInt(maxId), ...product};
    products.push(newProduct);
    writeDataToFile('./data/products.json', products);
    resolve(newProduct);
  })
}

module.exports = {
  findAll,
  findById,
  create,
}
