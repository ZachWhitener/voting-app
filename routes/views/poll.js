var Poll = require('../../models/poll');
var _ = require('lodash');

exports = module.exports = function(req, res) {
    var locals = res.locals; 
    locals.user = req.user;
    var user = req.user;
    var id = req.params.id; 
    var query = Poll.findOne({ _id: id });
    
    
    query.exec(function(err, poll){
        // For get request
        if (err) console.log(err);
        locals.poll = poll;
        locals.url = poll.url;
        locals.title = poll.title;
        locals.options = poll.options;
        locals.jsOptions = JSON.stringify(poll.options);
        console.log('jsOptions: ' + locals.jsOptions);
        locals.pollOptions = [];
        _.forEach(poll.options, function(value, key) {
            locals.pollOptions.push(value.option);
        });
        
        if (req.method.toLowerCase() == 'get') {
            res.render('views/poll');
        }
        
        // Post request
        var selected = req.body.optionSelect;
        if (req.method.toLowerCase() == 'post'){
            poll.totalVotes += 1;
            _.forEach(poll.options, function(item) {
                if (item.option == selected) {
                    console.log(item.option + ' was selected and is equal to ' + selected);
                    item.votes += 1;
                    //console.log(item.option.votes)
                    
                }
            });
            
            poll.save();
            console.log('------------------------');
            console.log('poll saved :)');
            console.log('------------------------');
            res.render('views/poll');
        }
        
    });
    

    
    
    
}