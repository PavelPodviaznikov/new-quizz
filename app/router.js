'use strict';

function router(app) {
    // app.get('/question', questions.generateQuestion);

    app.get('/themes', (req, res) => {
        res.send([{ name: 'Capitals', value: 'capitals' }]);
    });
}

module.exports = router;
