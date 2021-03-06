const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

const keys = require('./config/keys');
require('./models/User');

const app = express();
app.use(bodyParser.json());
app.use(cookieSession({ maxAge: 30 * 24 * 60 * 60 * 1000, keys: [keys.coockieKey] }));
app.use(passport.initialize());
app.use(passport.session());

require('./services/passport');
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(keys.mongoURI, options);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
