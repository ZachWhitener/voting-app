
exports = module.exports = function(req, res) {
    var locals = res.locals;
    locals.section = 'Login';
    locals.user = req.user;
    
    
    locals.message = req.flash('loginMessage');
    res.render('views/auth/login');
    
    
}