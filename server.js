/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const DEFAULT_PORT = 3000;

const PORT = process.env.PORT ? process.env.PORT : DEFAULT_PORT;

app.use(express.static(`${__dirname}/dist`));
const pathName = path.join(__dirname, './dist/index.html');

app.listen(PORT, () => {
    console.log(`listening ${PORT}!`);
});

app.get('/*', (_, res) => {
    res.sendFile(pathName);
});