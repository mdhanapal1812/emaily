const express = require("express");
const mongoose = require("mongoose");
/**
 * CookieSession to manage cookies in our application.
 */
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");

const keys = require("./config/keys");
/**
 * Note , the order of these files is important , because passport requires us to
 *  have our user schema created first .
 */
require("./model/User");
require("./model/Survey");
require("./services/passport");
mongoose.Promise = global.Promise;

mongoose.connect(keys.mongoURI);

/** creates a new application by running an express server app.
 *   This app will listen for incoming request and route them to different route handlers.
 *   All route handlers will be registered with this app.*/
const app = express();
app.use(bodyParser.json());

app.use(
  cookieSession({
    /**
     * Last for 30 days
     */
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

/**
 * Below configurations will make passport use cookies.
 */
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app);

/** For making heroku work on production , ie , if there are routes in react then heroku need to
 * fetch the build directory's main.js ..if its not found then it will use the index.html.
 */
if (process.env.NODE_ENV === "production") {
  //Express will serve up production assets like our main.js file or main.css file.
  app.use(express.static("client/build"));

  //Express will serve up the index.html file if it doesn't recognize the route.
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

/**
 * Changing the ports based on the production/development environment.
 */
const PORT = process.env.PORT || 5000;
app.listen(PORT);
