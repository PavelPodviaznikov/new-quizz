'use strict';

require("dotenv").config();

const PORT = process.env.SERVER_PORT || process.env.PORT || 3000;

let express = require('express');
let app = express();
let http = require('http').Server(app);
let router = require('./app/router');
let socket = require('./app/socket');
let firebase = require('./app/firebase');

router(app);
socket(http);
firebase.init();

app.use(express.static(__dirname + '/public'));

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
