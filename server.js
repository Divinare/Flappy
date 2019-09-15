'use strict';

const express = require('express');
var path = require('path');

const PORT = 5002;
const HOST = '0.0.0.0';
const BUILD_FOLDER = 'build';

const app = express();

app.use(express.static(BUILD_FOLDER))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + `/${BUILD_FOLDER}/index.html`));
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);