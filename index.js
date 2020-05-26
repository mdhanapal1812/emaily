const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

const keys = require('./config/keys');
/**
 * Note , the order of these files is important , because passport requires us to
 *  have our user schema created first .
 */
require('./model/User');
require('./services/passport');


/** creates a new application by running an express server app.
 *   This app will listen for incoming request and route them to different route handlers.
 *   All route handlers will be registered with this app.*/
const app = express();
mongoose.connect(keys.mongoURI);

app.use(
    cookieSession({
        maxAge:30*24*60*60*1000,
        keys:[keys.cookieKey]
                  })
);

app.use(passport.initialize());
app.use(passport.session());
//const authRoutes = require('./routes/authRoutes');
// authRoutes(app);
require('./routes/authRoutes')(app);


/** If we are running in production environment , then the port is given by heroku only in the last
 * second so we are telling to look at the underlying environment to look for a port.
 * If it is development environment , then we are going to look at port 5000.
 */
const PORT = process.env.PORT || 5000;
app.listen(PORT);