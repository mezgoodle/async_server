'use strict';

const Product = require('../models/productModel');
const { getPostData } = require('../utils');

// @desc Get All Products
// @route GET /api/products
async function getProducts(req, res) {
  try {
    const products = await Product.findAll();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(products));
  } catch (error) {
    console.error(error);
  }
}

// @desc Get Single Product
// @route GET /api/product/:id
async function getProduct(req, res, id) {
  try {
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Product Not Found' }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(product));
    }

  } catch (error) {
    console.error(error);
  }
}

// @desc Create A Product
// @route POST /api/product/
async function createProduct(req, res) {
  try {
    const body = await getPostData(req);

    const { title, description, price } = JSON.parse(body);

    const product = {
      title,
      description,
      price,
    };

    const newProduct = await Product.create(product);

    res.writeHead(201, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(newProduct));
  } catch (error) {
    console.error(error);
  }
}

// @desc Update A Product
// @route PUT /api/product/:id
async function updateProduct(req, res, id) {
  try {
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Product Not Found' }));
    } else {
      const body = await getPostData(req);

      const { title, description, price } = JSON.parse(body);

      const productData = {
        title: title || product.title,
        description: description || product.description,
        price: price || product.price,
      };

      const updProduct = await Product.update(id, productData);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(updProduct));
    }
  } catch (error) {
    console.error(error);
  }
}

// @desc Delet Product
// @route DELETE /api/product/:id
async function deleteProduct(req, res, id) {
  try {
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Product Not Found' }));
    } else {
      await Product.remove(id);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: `Product ${id} removed` }));
    }

  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
