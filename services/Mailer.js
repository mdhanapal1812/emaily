const sendgrid = require("sendgrid");
const helper = sendgrid.mail;
const keys = require("../config/keys");

class Mailer extends helper.Mail {
  /**
   * Subject and recipients that were passed , 
   * content thats a json content
   */
  constructor({ subject, recipients }, content) {
    super();

    /**
     * To communication with sendgrid API , we pass our autherization token
     */
    this.sgApi = sendgrid(keys.sendGridKey);
    this.from_email = new helper.Email("muthouazhagi1812@gmail.com");
    this.subject = subject;
    this.body = new helper.Content("text/html", content);
    this.recipients = this.formatAddresses(recipients);

    /**
     * Registering the content with the email.
     * addContent is built-in function
     */
    this.addContent(this.body);
    /**
     * Helper function for click tracking and addRecipients
     */
    this.addClickTracking();
    this.addRecipients();
  }

  /**
   * Recipients contains object emails.
   * We are extracting only the email ids from the objects.
   */
  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }

  /**
   * To register for clickTracking
   */
  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  /**
   * For every repient register with Personalization
   */
  addRecipients() {
    const personalize = new helper.Personalization();

    this.recipients.forEach((recipient) => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  }

  async send() {
    const request = this.sgApi.emptyRequest({
      method: "POST",
      path: "/v3/mail/send",
      body: this.toJSON(),
    });

    const response = await this.sgApi.API(request);
    return response;
  }
}

module.exports = Mailer;
