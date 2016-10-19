'use strict';

let express = require('express');
let app = express();
let router = require('./app/router');

router(app);

app.use(express.static(__dirname + '/public'));

app.listen(3000, () => {
    console.log('Listening on port 3000');
});