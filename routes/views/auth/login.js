
exports = module.exports = function(req, res) {
    var locals = res.locals;
    locals.section = 'Login';
    locals.user = req.user;
    
    // Handle get requests
    if (req.method.toLowerCase() == 'get') {
        console.log('get request');
    }
    
    locals.message = req.flash('loginMessage');
    res.render('views/auth/login');
    
    
}