'use strict';

let fs = require('fs');

module.exports = {
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min)) + min;
  },

  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  },

  encodeKey(string) {
    return encodeURIComponent(string).split('.').join('%2E');
  },

  encodeToBase64(file) {
    var bitmap = fs.readFileSync(file);
   // convert binary data to base64 encoded string
   return new Buffer(bitmap).toString('base64');
  }
};
