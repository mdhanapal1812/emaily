const passport = require ('passport');

module.exports =(app) => {
    /** This is a route handler , whenever use uses the auth/google , it will be routed to passport
     * which handles the google authentication part.
     */
    app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        (req,res) =>{
            res.redirect('/surveys');
        }
    );

    app.get('/api/logout',(req,res)=>{
        req.logout();
        res.redirect('/');
    });


    app.get('/api/current_user',(req,res)=>{
        res.send(req.user);
    })


};