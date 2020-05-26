const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');



/** 1 argument means we are trying to fetch some module out of mongoose , 2 arguments means
 * we are trying to create a model.
 */
const User = mongoose.model('users');

passport.serializeUser((user,done)=>{
    //this user id is the one generated by mongo for every user .. not google id.
    done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    User.findById(id).then(user=>{
        done(null,user);
    })
});
passport.use(new GoogleStrategy({
                                    clientID:keys.googleClientID,
                                    clientSecret: keys.googleClientSecret,
                                    /** This callback represents where the user will be routed to
                                     * after the user grants permission
                                     * for google to access.
                                     */
                                    callbackURL: '/auth/google/callback'
                                },
                                /** At this point after callback we will have access token and user's profile information*/
                                (accessToken,refereshToken,profile,done) => {

                                    /** Note this could be put in daos section */
                                    User.findOne({googleId: profile.id})
                                    /** Existing user might represent one mongoose record or nill if no user record was found*/
                                        .then((existingUser) => {
                                            if (existingUser) {
                                                /** We already have an user with same record ID so not creating
                                                 * a new one.
                                                 */
                                                /** passport need to know that we are finished. So we need to call done.
                                                 * null means no error.
                                                 * 2nd argument is the record.
                                                 */
                                                done(null,existingUser);
                                            } else {
                                                /** This is to create a new user every time and save it to the model */
                                                new User({googleId: profile.id}).save().
                                                then(user=> done(null,user));
                                            }
                                        })
                                }
));
