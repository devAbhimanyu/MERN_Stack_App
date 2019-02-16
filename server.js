const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
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

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`app initialised at port ${port}`);
});
