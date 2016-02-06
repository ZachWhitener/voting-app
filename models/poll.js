var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pollSchema = mongoose.Schema({
    
    title: String,
    author: { type: Schema.Types.ObjectId, ref: 'User' }, // Assign the id of the creator to author
    totalVotes: Number,
    featured: Boolean,
    options: [{
        option: String,
        votes: Number
    }]
    
});

pollSchema.methods.addOne = function(votes) {
    return votes + 1;
}

module.exports = mongoose.model('Poll', pollSchema);