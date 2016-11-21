'use strict';

let firebase = require('./firebase');

function router(app) {
    // app.get('/question', questions.generateQuestion);

    app.get('/themes', (req, res) => {
        res.send([{ name: 'Capitals', value: 'capitals' }]);
    });

    app.get('/user', firebase.onUserAuthenticated);
}

module.exports = router;
