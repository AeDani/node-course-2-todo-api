var mongoose = require('mongoose')

// mongoose user model
// email property - require it - trim it - type String - lenght min 1
var User = mongoose.model('User',{
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
})

module.exports = {User}