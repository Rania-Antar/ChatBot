var mongoose = require('mongoose') ;
var user = require('./users.js');

var lostObjectSchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true, minlength: 1},
    description: {type: String, required: true, maxlength: 100},
    where_found: {type: String, required: true},
    where_to_get: {type: String, required: true},
    photo: [{type: String, required: false}],
    looking_for: {type: Boolean, required: true},
    found: {type: Boolean, required: true},
    user_to_report: { type: String, required: false },
    created_by:  user.schema
}) ;

module.exports.model = mongoose.model('Lost_Object', lostObjectSchema)
module.exports.schema = lostObjectSchema ;