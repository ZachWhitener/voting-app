var _ = require('lodash');
var mongoose = require('mongoose');
var Poll = require('../../models/poll');

exports = module.exports = function(req, res) {
    
    var locals = res.locals; 
    
    locals.section = 'New Poll'; 
    locals.sectionclass = 'newpoll';
    locals.user = req.user;
    
    if (req.method.toLowerCase() == 'get') {
        console.log('get request to new');
        res.render('views/new');
    }
    
    if (req.method.toLowerCase() == 'post') {
        
        var optsArray = [];
        var opts = req.body.option; // options
        var pollObj = {};
        var user = req.user; 
        
        _.forEach(opts, function(item){
            optsArray.push({
                option: item, 
                votes: 0
            });
        });
        
        pollObj = {
            title: req.body.title, 
            author: user._id,
            totalVotes: 0,
            featured: false, 
            options: optsArray
        };
        
        var poll = new Poll(pollObj); 
        
        poll.save(function(err){
            if (err) {
                console.log(err);
            }
            
            console.log('------------------');
            console.log('New poll saved');
            console.log('------------------');
        });
        
        
        res.render('views/poll');
    }
}