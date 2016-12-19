'use strict';

const bodyParser = require('body-parser');

const firebase = require('./firebase');
const Auth = require('./controllers/AuthController');
const enums = require('./enums');

function router(app) {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get(enums.routes.env, (req, res) => {
      res.send(firebase.config);
    });

    app.post(enums.routes.user, Auth.registerUser);
    app.post(enums.routes.googleUser, Auth.registerUserWithGoogle);
    app.get(enums.routes.user, Auth.authorizeUser);
    app.get(enums.routes.googleUser, Auth.authorizeUserWithGoogle)
}

module.exports = router;
