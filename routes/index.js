var path = process.cwd();
var routes = {};
var middleware = require('./middleware'); 
var path = process.cwd();

middleware.initLocals; 

exports = module.exports = function(app, passport) {
    var locals;
    
    // Handle get requests
    app.get('/', require(path + '/routes/views/home'));
    app.get('/login', require(path + '/routes/views/auth/login'));
    app.get('/signup', require(path + '/routes/views/auth/signup'));
    app.get('/profile', isLoggedIn, require(path + '/routes/views/profile'));
    app.all('/new', isLoggedIn, require(path + '/routes/views/new'));
    app.all('/poll/:id', require(path + '/routes/views/poll'));
    // logout
    app.get('/logout', function(req, res){
        locals = res.locals;
        req.logout();
        res.redirect('/');
    });
    
    // Handle post requests
    
    
    //app.post('/new', require(path + '/routes/views/new'));
    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile', // Redirect to the secure profile section
        failureRedirect: '/login', // Redirect back to the signup page if there is an error
        failuerFlash: true // Allow flash messages
    }));
    // Process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile', // Redirect back to secure profile section
        failureRedirect: '/signup',  // Redirect back to signup page on error
        failureFlash: true // Allow flash messages
    }));
    
    /**
    app.get('/', function(req,res){
        locals = res.locals; 
        locals.section = 'Home';
        locals.test = 'just checking';
       res.render('views/home');  
    });
    **/
    
    // show the login form
    /**
    app.get('/login', function(req, res){
        locals = res.locals; 
        locals.section = 'Login'
        locals.message = req.flash('loginMessage');
        res.render('views/auth/login');
    });
    **/
    
    /**
    // show the signup form
    app.get('/signup', function(req, res){
        locals = res.locals;
        locals.section = 'Signup'
        locals.message = req.flash('signupMessage');
        res.render('views/auth/signup')
    });
    **/
    /**
    // profile section, make sure user is logged in at this point
    app.get('/profile', isLoggedIn, function(req, res){
        locals = res.locals;
        locals.section = 'Profile';
        locals.user = req.user; 
        res.render('views/profile');
    });
    **/
    
    
    function isLoggedIn(req, res, next) {
        
        // if user is authenticated in the session,  carry on
        if (req.isAuthenticated()) {
            return next();
        }
        
        // user isn't logged in at this point.
        res.redirect('/');
    }
}