'use strict';

const products = require('../data/products.json');
const { writeDataToFile, getRandomInt } = require('../utils');

const findAll = () => new Promise((resolve, reject) => {
  resolve(products);
});

const findById = id => new Promise((resolve, reject) => {
  const product = products.find(p => p.id === id);
  resolve(product);
});

const create = product => new Promise((resolve, reject) => {
  const maxId = 10000;
  const newProduct = { id: getRandomInt(maxId), ...product };
  products.push(newProduct);
  writeDataToFile('./data/products.json', products);
  resolve(newProduct);
});

module.exports = {
  findAll,
  findById,
  create,
};
