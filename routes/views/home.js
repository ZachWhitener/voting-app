

exports = module.exports = function(req, res) {
    var locals = res.locals;
    
    locals.section = 'Home';
    locals.user = req.user;
    
    res.render('views/home');
}