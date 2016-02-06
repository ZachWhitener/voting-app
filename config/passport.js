

var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user.js');

module.exports = function(passport) {
    // Passport session setup
    // Required for persistent login sessions
    // Passport needs the ability to serialize and unserialize users out of session
    
    
    // Used to serialize the user for the session
    passport.serializeUser(function(user, done){
        done(null, user.id);
    });
    
    // Used to deserialize the user
    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
            done(err, user);
        });
    });
    
    // Local Signup
    // we are using named strategies since we have one for login and one for signup by default,
    // if there was no name, it would just be called 'local'
    
    passport.use('local-signup', new LocalStrategy({
        // By default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // Allows us to pass back the entire request to the callback
    }, function(req, email, password, done) {
        
        // Asynchronous
        // User.findOne won't fire unless data is sent back
        process.nextTick(function(){
            
            // Find a user whose email is the same as the forms email
            // We are checking to see if the user trying to login already exists
            User.findOne({ 'local.email': email }, function(err, user) {
                // If there are any errors, return the error
                if (err) {
                    return done(err);
                }
                
                console.log('no error in User.findOne({...');
                
                // Check to see if there's already a user with that email
                if (user) {
                    return done(null, false, req.flash('signupMessage', 'That email is already registered.'));
                } 
                else {
                    // At this point, there is no user with that email, so create the user
                    var newUser = new User();
                    
                    // Set the user's local credentials
                    newUser.local.emaill = email;
                    newUser.local.password = newUser.generateHash(password);
                    
                    newUser.save(function(err){
                        if (err) {
                            throw err;
                        }
                        
                        console.log('----------------------------');
                        console.log('New user created.');
                        console.log('----------------------------');
                        
                        return done(null, newUser);
                    });
                    
                }
            });
        });
    }));
};