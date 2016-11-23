'use strict';

let bodyParser = require('body-parser');

let firebase = require('./firebase');
let Auth = require('./controllers/AuthController');

function router(app) {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/themes', (req, res) => {
        res.send([{ name: 'Capitals', value: 'capitals' }]);
    });

    app.get('/env', (req, res) => {
      res.send(firebase.config);
    });

    app.post('/user', Auth.registerUser);

    app.get('/user', firebase.onUserAuthenticated);
}

module.exports = router;
