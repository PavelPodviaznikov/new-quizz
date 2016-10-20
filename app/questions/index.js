'use strict';

let capitals = require('./themes/capitals.json');

let questions = {
  getThemeQuestions(theme) {
    switch (theme) {
      case 'capitals':
        return capitals;
      default:
        return [];
    }
  }
};

module.exports = questions;