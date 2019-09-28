const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');

const app = express();
app.use(cookieSession({ maxAge: 30 * 24 * 60 * 60 * 1000, keys: [keys.coockieKey] }));
app.use(passport.initialize());
app.use(passport.session());

require('./services/passport');
require('./routes/authRoute')(app);

const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(keys.mongoURI, options);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
