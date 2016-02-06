

exports = module.exports = function(req, res) {
    var locals = res.locals;
    locals.section = 'Signup';
    locals.user = req.user;
    
    locals.message = req.flash('signupMessage');
    res.render('views/auth/signup');
}