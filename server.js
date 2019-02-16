const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();
//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//db config
const dbConnStr = require('./config/keys').mongoURI;
console.log(dbConnStr);
//connecting to db;
mongoose
  .connect(dbConnStr)
  .then(() => {
    console.log('db connected');
  })
  .catch(err => {
    console.log('db threw error' + err);
  });

//passport middleware
app.use(passport.initialize());

//passport strategy
require('./config/passport.dev')(passport);

//Use Routes 
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`app initialised at port ${port}`);
});
