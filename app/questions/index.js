'use strict';

let capitals = require('./themes/capitals.json');

let questions = {
  generateQuestion(req, res){
      let question = generateQuestion(req.query.categoryName);

      res.send(question);
  }
};

function generateQuestion(theme) {
  let questions = getAllQuestionsByTheme(theme),
      question = questions[getRandomInt(0, questions.length)];

  question.answers = [ question.answer ];

  for(let i=0; i<3; i++) {
    question.answers.push(questions[getRandomInt(0, questions.length)].answer);
  }

  question.answers = shuffle(question.answers);

  return question;
}

function getAllQuestionsByTheme(theme) {
  switch (theme) {
    case 'capitals':
      return capitals.map(item => {
        return {name: item.country, answer: item.capital};
      });
    default:
      return [];
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min)) + min;
}

function shuffle(array) {
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
}

module.exports = questions;
