var mongoose = require('mongoose')
var valid = require('validator')


const SpecialAttributesSchema = new mongoose.Schema({
    laziness : {type: Number} ,
    withstanding : {type : Number} , // Capable of withstanding high pressure
    safe_route : {type : Number} , // Wanting a safe route for jobs later on with guaranteed stability in work and income
})

var usersSchema = new mongoose.Schema({
    cin:{type: Number, default: null},
    email: {type: String, required: true,
        validate:{
            validator: valid.isEmail,
            message: '{VALUE} is not an email'
        }
    },
    password: {type: String},
    identification : {type:String},
    first_name:{type: String, minLength: 1, trim:true},
    last_name:{type: String, minLength: 1, trim: true},
    phone_number:{type: Number, default: null},
    birthday:{type: Date},
    confirmation_code:{type:String},
    registration_date: {type: Date, default: Date.now()},
    role:['Client','Employee'],

})
module.exports.model =  mongoose.model('Users', usersSchema) ;
module.exports.schema = usersSchema ;