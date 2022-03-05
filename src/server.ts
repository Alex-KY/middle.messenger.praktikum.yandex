// server.js
const express = require('express');
const PORT = 3000;

const app = express();

app.use(express.static('dist'));

app.use('/login', express.static('dist'));
app.use('/signup', express.static('dist'));
app.use('/chat', express.static('dist'));
app.use('/profile', express.static('dist'));
app.use('/404', express.static('dist'));
app.use('/500', express.static('dist'));

app.listen(process.env.PORT || PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});
