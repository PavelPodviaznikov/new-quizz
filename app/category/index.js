'use strict';

let capitals = require('./themes/capitals.json');
let util = require('../util');

let categories = {
  capitals: {
    activeQuestion: null
  }
};

module.exports = {
  init: init,
  generateQuestion: generateQuestion
};

function init(config) {
  let socket = config.socket,
      category = config.category;

  if(categories[category].activeQuestion) {
    socket.emit(`category:${category}:question`, categories[category].activeQuestion);
  } else {
    generateQuestion(config);
  }
}

function generateQuestion(config) {
  let category = config.category,
      socket = config.socket,
      questions = getAllQuestionsByTheme(category),
      question = questions[util.getRandomInt(0, questions.length)];

  question.answers = [ question.answer ];

  for(let i=0; i<3; i++) {
    question.answers.push(questions[util.getRandomInt(0, questions.length)].answer);
  }

  question.answers = util.shuffle(question.answers);

  categories[category].activeQuestion = Object.assign({}, question);

  socket.emit(`category:${category}:question`, question);
  socket.broadcast.emit(`category:${category}:question`, question);
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
