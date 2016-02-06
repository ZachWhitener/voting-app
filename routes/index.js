var path = process.cwd();
var routes = {};
var middleware = require('./middleware'); 

middleware.initLocals; 

exports = module.exports = function(app, passport) {
    var locals;
    app.get('/', function(req,res){
        locals = res.locals; 
        locals.section = 'Home'
        locals.test = 'just checking';
       res.render('home');  
    });
    
    // show the login form
    app.get('/login', function(req, res){
        locals = res.locals; 
        locals.section = 'Login'
        locals.message = req.flash('loginMessage');
        res.render('login');
    });
    
    // process the login form
    // app.post('/login', do all passport stuff)
    
    
    // show the signup form
    app.get('/signup', function(req, res){
        locals = res.locals;
        locals.section = 'Signup'
        locals.message = req.flash('signupMessage');
        res.render('signup')
    });
    
    // Process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile', // Redirect back to secure profile section
        failureRedirect: '/signup',  // Redirect back to signup page on error
        failureFlash: true // Allow flash messages
    }));
    
    // profile section, make sure user is logged in at this point
    app.get('/profile', isLoggedIn, function(req, res){
        locals = res.locals;
        locals.section = 'Profile';
        locals.user = req.user; 
        res.render('profile');
    });
    
    // logout
    app.get('/logout', function(req, res){
        locals = res.locals;
        req.logout();
        res.redirect('/');
    });
    
    function isLoggedIn(req, res, next) {
        
        // if user is authenticated in the session,  carry on
        if (req.isAuthenticated()) {
            return next();
        }
        
        // user isn't logged in at this point.
        res.redirect('/');
    }
}