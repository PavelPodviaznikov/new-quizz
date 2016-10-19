'use strict';

let capitals = require('./themes/capitals.json');

let questions = {
    getThemeQuestions(theme) {
        return capitals;
    }
};

module.exports = questions;