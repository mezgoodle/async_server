# nodejs

[![Language](https://img.shields.io/badge/language-javascript-brightgreen?style=flat-square)](https://uk.wikipedia.org/wiki/JavaScript)

Hello everyone! This is the part of my **async_server** repository with _JavaScript_.

## Table of contents

- [Motivation](#motivation)
- [Build status](#build-status)
- [Badges](#badges)
- [Features](#features)
- [Code Example](#code-example)
- [Installation](#installation)
- [Fast usage](#fast-usage)
- [API Reference](#api-reference)
- [Tests](#tests)
- [Credits](#credits)

## Motivation

I wanted to create REST API service on Node.Js, and I saw [this](https://www.youtube.com/watch?v=_1xa8Bsho6A) greate lesson on YouTube. So I added testing to this project.

## Build status

Here you can see build status of [continuous integration](https://en.wikipedia.org/wiki/Continuous_integration):

![Node.js CI](https://github.com/mezgoodle/async_server/workflows/Node.js%20CI/badge.svg)

## Badges

Other badges

[![Theme](https://img.shields.io/badge/Theme-REST_API-brightgreen?style=flat-square)](https://uk.wikipedia.org/wiki/REST)
[![Platform](https://img.shields.io/badge/Platform-Node.JS-brightgreen?style=flat-square)](https://nodejs.org/uk/)

## Features

On the site you can **get** all products or a single one, **post** a new one, **put** an update and **delete** something.

## Code Example

- Get _POST_ data

```js
const getPostData = req => new Promise((resolve, reject) => {
  try {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      resolve(body);
    });
  } catch (error) {
    reject(error);
  }
});
```

- Create Product _Model_

```js
const findAll = () => new Promise(resolve => {
  resolve(products);
});

const findById = id => new Promise(resolve => {
  const product = products.find(p => p.id === id);
  resolve(product);
});

const create = product => new Promise(resolve => {
  const maxId = 10000;
  const newProduct = { id: getRandomInt(maxId), ...product };
  products.push(newProduct);
  if (process.env.NODE_ENV !== 'test') {
    writeDataToFile('./data/products.json', products);
  }
  resolve(newProduct);
});

const update = (id, product) => new Promise(resolve => {
  const index = products.findIndex(p => p.id === id);
  products[index] = { id, ...product };
  if (process.env.NODE_ENV !== 'test') {
    writeDataToFile('./data/products.json', products);
  }
  resolve(products[index]);
});

const remove = id => new Promise(resolve => {
  products = products.filter(p => p.id !== id);
  if (process.env.NODE_ENV !== 'test') {
    writeDataToFile('./data/products.json', products);
  }
  resolve();
});
```

## Installation

1. Clone this repository:

```bash
git clone https://github.com/mezgoodle/async_server.git
```

2. Move to _nodejs_ folder and install dev-dependencies(if needed):

```bash
cd nodejs
npm i --only=dev
```

3. Test the server:

```bash
npm test
```

## Fast usage

1. Start the server:

```bash
npm start
```

2. Open `localhost:5000` in browser

## API Reference

Method    | Route     | Argument     | Status code | Description
--------|----------|--------------|---------|------------
GET | `/api/products` | `None` | `200`  | get all products
GET | `/api/products/:id` | `id` | `200`  | get single product
POST | `/api/products` | `None` | `201`  | create a product
PUT | `/api/products/:id` | `id` | `200`  | update a product
DELETE | `/api/products/:id` | `id` | `200`  | delete a product

## Tests

All tests are in [test](https://github.com/mezgoodle/async_server/blob/master/nodejs/test/products.js) folder. I'm using [mocha](https://github.com/mochajs/mocha) and [chai](https://github.com/chaijs/chai) with [chai-http](https://github.com/chaijs/chai-http).

## Credits

Links to resources which inspired me to build this project:

- [Lesson on YouTube](https://www.youtube.com/watch?v=_1xa8Bsho6A)

- [Article about testing](https://habr.com/ru/post/308352/)

- [Mocha and Chai testing](https://www.youtube.com/watch?v=MLTRHc5dk6s)
