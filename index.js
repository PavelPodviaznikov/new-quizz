'use strict';

let express = require('express');
let app = express();
let http = require('http').Server(app);
let router = require('./app/router');
let socket = require('./app/socket');

router(app);
socket(http);

app.use(express.static(__dirname + '/public'));

http.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on port ${process.env.PORT || 3000}`);
});
