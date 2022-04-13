const express = require('express');
const expressHistory = require('express-history-api-fallback');
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static('./dist'));

app.use(expressHistory('index.html', { root: 'dist' }));

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});
