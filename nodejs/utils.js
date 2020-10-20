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

const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));

module.exports = {
  writeDataToFile,
  getRandomInt,
};
