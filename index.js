'use strict';

require("dotenv").config();

const PORT = process.env.PORT || process.env.SERVER_PORT || 3000;

console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
console.log(PORT);
console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');

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
