exports.initLocals = function(req, res, next) {
    var locals = res.locals;
    locals.user = !!req.user;
    
    console.log(locals.user);
    next();
}