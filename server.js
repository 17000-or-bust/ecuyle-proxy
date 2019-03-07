require('newrelic');
const express = require('express');
const morgan = require('morgan');
const compress = require('compression');
const proxy = require('http-proxy-middleware');

const PORT = 8000;
const USE_MORGAN = false;

let app = express();

app.use(
  '/api/reserve',
  proxy({
    target: 'http://localhost:3003',
    changeOrigin: true
  })
);

app.use(compress());
app.use(express.static(__dirname + '/public'));

if (USE_MORGAN) app.use(morgan('dev'));

app.use('/:id', express.static(__dirname + '/public'));

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
