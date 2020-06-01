const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

const keys = require('./config/keys');
/**
 * Note , the order of these files is important , because passport requires us to
 *  have our user schema created first .
 */
require('./model/User');
require('./model/Survey');
require('./services/passport');


/** creates a new application by running an express server app.
 *   This app will listen for incoming request and route them to different route handlers.
 *   All route handlers will be registered with this app.*/
const app = express();
mongoose.connect(keys.mongoURI);

app.use(bodyParser.json());

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
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);


/** For making heroku work on production , ie , if there are routes in react then heroku need to
 * fetch the build directory's main.js ..if its not found then it will use the index.html.
 */
if(process.env.NODE_ENV === 'production'){

    //Express will serve up production assets like our main.js file or main.css file.
    app.use(express.static('client/build'));

    //Express will serve up the index.html file if it doesn't recognize the route.
    const path = require('path');
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}


/** If we are running in production environment , then the port is given by heroku only in the last
 * second so we are telling to look at the underlying environment to look for a port.
 * If it is development environment , then we are going to look at port 5000.
 */
const PORT = process.env.PORT || 5000;
app.listen(PORT);