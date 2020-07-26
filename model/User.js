const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * This collection stores the user information.
 */
const userSchema = new Schema({
    googleId: String,
    credits: { type: Number, default: 0 }
});

mongoose.model('users', userSchema);