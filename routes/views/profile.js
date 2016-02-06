

exports = module.exports = function(req, res) {
    var locals = res.locals;
    locals.section = 'Profile';
    locals.user = req.user;
    res.render('views/profile');
};