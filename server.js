require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8080;

const indexHtml = require('fs').readFileSync('./build/index.html');

app.use(express.static('./build/'));

app.listen(port, () => {
  console.log(`Listening on port: ${port}`)
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

module.exports = app;

require('./server/routes');

app.use((req, res) => {
  res.end(indexHtml);
});
