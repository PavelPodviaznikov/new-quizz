'use strict';

let questions = require('./questions');

function router(app) {
    app.get('/questions', (req, res) => {
        let questionsCollection = questions.getThemeQuestions('capitals');
        res.send(questionsCollection);
    });

    app.get('/themes', (req, res) => {
        res.send([{ name: 'Capitals', value: 'capitals' }]);
    });
};

module.exports = router;