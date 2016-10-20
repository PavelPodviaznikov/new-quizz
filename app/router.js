'use strict';

let questions = require('./questions');

function router(app) {
    app.get('/category', (req, res) => {
        let questionsCollection = questions.getThemeQuestions(req.query.categoryName);
        res.send(questionsCollection);
    });

    app.get('/themes', (req, res) => {
        res.send([{ name: 'Capitals', value: 'capitals' }]);
    });
}

module.exports = router;