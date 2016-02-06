exports.initLocals = function(req, res, next) {
    var locals = res.locals;
    next();
}