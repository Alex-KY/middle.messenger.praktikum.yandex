const express = require('express');
const PORT = 3000;

const app = express();

app.use(express.static('dist'));

app.use('/*', express.static('dist'));

app.listen(process.env.PORT || PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});
