const _ = require("lodash");
const { Path } = require("path-parser");
//URL is default and already provided by node
const { URL } = require("url");
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const requireCredits = require("../middleware/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

/**
 * This file contains the route handlers responsible for surveys.
 */
const Survey = mongoose.model("surveys");

module.exports = (app) => {

  /**
   * This route handler returns a list of surveys created by the current user.
   */
  app.get("/api/surveys", requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false,
    });

    res.send(surveys);
  });

  /**
   * This route handler is used to display a message to user after the user has voted.
   */
  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    res.send("Thanks for voting!");
  });

  /**
   * This route handler records feedback from a user.
   * (Loadash & Path-Parser is used for parsing the path)
   * Remember that sendgrid sends us the click event property 
   * along with URL property where the user clicked yes/no.
   * Here , the duplicate clicks are removed , paths that do not match to the 
   * path we want are also removed.
   */
  app.post("/api/surveys/webhooks", (req, res) => {
    /**
     * p represents the pathname that we are trying to extract from path.
     */
    const p = new Path("/api/surveys/:surveyId/:choice");

    /**
     * Lodash chain links every step below together.
     */
    _.chain(req.body)
      .map(({ email, url }) => {

        /**
         * Extract the path from the URL.
         */
        const match = p.test(new URL(url).pathname);
        /**
         * If there is survey and choice , then match will contain the object otherwise it will be null.
         */
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      /** Compact returns only the event objects , null are not included. */
      .compact()
      /** Checking if unique emails and surveyId are prsent */
      .uniqBy("email", "surveyId")
      /** For every survey ID email and choice , update it in database. */
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false },
            },
          }
          ,

          {
            /**
             * inc property is mongo operator - that increments the choice of yes or no to 1.
             * [choice] is not an array but in realtime replaces it with 'yes' or 'no' of feedback.
             */
            $inc: { [choice]: 1 },
            /**
             * set that the appropriate recipient has responded to true.
             */
            $set: { "recipients.$.responded": true },
            lastResponded: new Date(),
          }
        ).exec();
      })
      .value();

    res.send({});
  });

  /**
   * This route handler is used to create surveys.
   * In order to create surveys - user must be logged in as well as
   * have some credits - so these middlewares are passed.
   */
  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients
        .split(",")
        .map((email) => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now(),
    });

    /**
     * Mailer helper which helps in sending the information to Email provider ,
     * This email provider will send out the emails.
     * Need to pass the survey instance and actual survey template.
     * Refer mailer.js and surveyTemplate.js for functionality
     */
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save();

      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
