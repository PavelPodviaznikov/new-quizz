'use strict';

let capitals = require('../themes/capitals.json');
let countries = require('../themes/countries/countries.json');
let util = require('../util');
let firebase = require('../firebase');

let categories = {
  capitals: {
    activeQuestion: null,
    leaderboard: {}
  },
  countries: {
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
  },
  resetActiveQuestion(category) {
    if(!category) category = 'capitals';

    categories[category].activeQuestion = null;
  }
};

function updateUserStatistic(config) {
  let socket = this;

  if(!config.email) return false;

  firebase.updateScore(util.encodeKey(config.email), config.score)
    .then(() => {
      let scores = {};
      scores[config.email] = score;
      socket.emit('room:answer:checked', scores);
    });
}

function generateCountriesQuestion() {
  let countryKey = Object.keys(countries)[util.getRandomInt(0, Object.keys(countries).length)];
  let country = countries[countryKey];

  let pathToImg = `./app/themes/countries/img/${countryKey.toLowerCase()}.png`;
  let flag = util.encodeToBase64(pathToImg);

  let question = {
    flag: `data:image/png;base64, ${flag}`,
    answer: country,
    answers: [country]
  };

  for(let i=0; i<3; i++) {
    question.answers.push(countries[Object.keys(countries)[util.getRandomInt(0, Object.keys(countries).length)]]);
  }

  return question;
}

function generateCapitalsQuestion() {
  let questions = capitals.map(item => {
    return {name: item.country, answer: item.capital};
  });

  let question =  questions[util.getRandomInt(0, questions.length)];

  question.answers = [ question.answer ];

  for(let i=0; i<3; i++) {
    question.answers.push(questions[util.getRandomInt(0, questions.length)].answer);
  }

  return question;
}

function generateQuestion(category) {
  let question;

  switch (category) {
    case 'capitals':
      question = generateCapitalsQuestion();
      break;
    case 'countries':
      question = generateCountriesQuestion();
      break;
  }

  question.answers = util.shuffle(question.answers);
  question.seconds = new Date().getSeconds();
  question.category = category;

  categories[category].activeQuestion = Object.assign({}, question);

  this.emit('room:question', categories[category].activeQuestion);
  this.broadcast.emit('room:question', categories[category].activeQuestion);
}
