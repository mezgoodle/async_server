'use strict';

let products = require('../data/products.json');
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
  if (process.env.NODE_ENV !== 'test') {
    writeDataToFile('./data/products.json', products);
  }
  resolve(newProduct);
});

const update = (id, product) => new Promise((resolve, reject) => {
  const index = products.findIndex(p => p.id === id);
  products[index] = { id, ...product };
  if (process.env.NODE_ENV !== 'test') {
    writeDataToFile('./data/products.json', products);
  }
  resolve(products[index]);
});

const remove = id => new Promise((resolve, reject) => {
  products = products.filter(p => p.id !== id);
  if (process.env.NODE_ENV !== 'test') {
    writeDataToFile('./data/products.json', products);
  }
  resolve();
});

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
