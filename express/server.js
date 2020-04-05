'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

const router = express.Router();
router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello</h1>');
  res.write('<h2>this api provide you acces to movies datas</h2>');
  res.write('<h2>you can add movie of several actor by entering /movies/populate/:id (imdb id of the actor) </h2>');
  res.write('<h2>you can have acces to a movie by entering  /movies/:id (imdb id of the movie) </h2>');
  res.write('<h2>you can have acces to a random movie with a metascore greater than 70 by entering /movies</h2>');
  res.write('<h2>you can have acces to list of random movies by entering /movies/search&limit=XX&metascore=YY</h2>');
  res.end();
});
router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);

