const passport = require("passport");

/**
 * This file contains the route handlers responsible for user authentication.
 */
module.exports = (app) => {

  /**
   * This route handler handles the initial route for authentication
   */
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  /**
   * This route handler handles the callback after the passport authenticate is completed(after user
   * is authenticated through Google OAuth). 
   * Now the user is redirected to the surveys component(dashboard)
   */
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/surveys");
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  /**
   * This route handler sends the current user instance.
   * (Deserialize user is responsible for us having able to provide this)
   */
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
