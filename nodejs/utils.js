'use strict';

const fs = require('fs');
const { stringify } = require('querystring');

const writeDataToFile = (filename, content) => {
  fs.writeFileSync(filename, JSON, stringify(content), 'utf8', err => {
    if (err) {
      console.error(err);
    }
  });
};

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

const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));

module.exports = {
  writeDataToFile,
  getRandomInt,
  getPostData,
};
