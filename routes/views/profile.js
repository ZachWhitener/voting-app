var Poll = require('../../models/poll'); 
var User = require('../../models/user'); 
var _ = require('lodash');


exports = module.exports = function(req, res) {
    var locals = res.locals;
    locals.section = 'profile';
    var user = req.user;
    locals.user = user;
    locals.polls = [];
    
    var userId = user._id;
    var query = Poll.find({ 
        author: userId 
    });
    
    query.exec(function(err, poll){
       if (err) console.log(err);
       
       console.log(poll); 
       locals.polls = poll; 
       res.render('views/profile');
    });
    
    
    
    
   // res.render('views/profile');
};