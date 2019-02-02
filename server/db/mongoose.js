var mongoose = require('mongoose')

const url = process.env.MONGODB_URI
mongoose.connect(url, {useNewUrlParser: true})

module.exports = {
    mongoose
}