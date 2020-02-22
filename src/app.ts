/* eslint-disable no-console */
import 'reflect-metadata';

import createConnection from '../db/connection';

import User from './entity/User';

import express = require('express');


const app: express.Application = express();

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(3000, () => {
});
