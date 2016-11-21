'use strict';

require("dotenv").config();

let express = require('express');
let app = express();
let http = require('http').Server(app);
let router = require('./app/router');
let socket = require('./app/socket');
let firebase = require('./app/firebase');
let bodyParser = require('body-parser');

router(app);
socket(http);
firebase.init();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

http.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
