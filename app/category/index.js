'use strict';

let capitals = require('./themes/capitals.json');
let util = require('../util');

let interval;

let categories = {
  capitals: {
    activeQuestion: null,
    leaderboard: {}
  }
};

module.exports = {
  generateQuestion(category) {
    //this === socket
    if(categories[category].activeQuestion) {
      this.emit('room:question', categories[category].activeQuestion);
    } else {
      generateQuestion.call(this, category);
    }
  },
  checkAnswer(config) {
    updateUserStatistic.call(this, config);
    generateQuestion.call(this, config.category);
  },
  clear() {
    for (let category in categories) {
      if(categories[category].leaderboard[this.id]) {
        delete categories[category].leaderboard[this.id];
      }

      if(!Object.keys(categories[category].leaderboard).length) {
        categories[category].activeQuestion = null;
      }
    }
  }
};

function updateUserStatistic(config) {
  let socket = this;

  if(!categories[config.category].leaderboard[socket.id]) {
    categories[config.category].leaderboard[socket.id] = {
      score: {
        correct: 0,
        incorrect: 0
      }
    };
  }

  checkAnswer(config.answer, config.category) ?
      categories[config.category].leaderboard[socket.id].score.correct++ :
      categories[config.category].leaderboard[socket.id].score.incorrect++;

  socket.emit('room:answer:checked', categories[config.category].leaderboard);
}

function checkAnswer(answer, category) {
  return answer === categories[category].activeQuestion.answer;
}

function generateQuestion(category) {
  let questions = getAllQuestionsByTheme(category),
      question = questions[util.getRandomInt(0, questions.length)];

  if(interval) clearInterval(interval);

  question.answers = [ question.answer ];

  for(let i=0; i<3; i++) {
    question.answers.push(questions[util.getRandomInt(0, questions.length)].answer);
  }

  question.answers = util.shuffle(question.answers);

  categories[category].activeQuestion = Object.assign({}, question);

  setQuestionTimeLife.call(this, categories[category].activeQuestion, category);

  this.emit('room:question', categories[category].activeQuestion);
  this.broadcast.emit('room:question', categories[category].activeQuestion);
}

function setQuestionTimeLife(question, category) {
  question.time = 15;
  interval = setInterval(()=>{
    if(question.time === 0) {
      generateQuestion.call(this, category);
    }
    question.time--;
  }, 1000);
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
