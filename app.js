const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const path = require('path');
const app = express();
const usersRouter = require('./routes/users');
const homeRouter = require('./routes/index');

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(cookieSession({
  name: 'session',
  keys: [process.env.COOKIE_KEY || 'DOAN'],
  maxAge: 4 * 7 * 24 * 60 * 60 * 1000
}));


require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './public')));

app.use('/', homeRouter);
app.use('/user', usersRouter); 

const port = process.env.PORT || 3000;
console.log(`Server is listening on port ${port}`);
app.listen(port);