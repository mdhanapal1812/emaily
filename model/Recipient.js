const mongoose = require("mongoose");
const { Schema } = mongoose;

/**
 * This collection is to store the recipients information.
 */
const recipientSchema = new Schema({
  email: String,
  responded: { type: Boolean, default: false },
});

module.exports = recipientSchema;
