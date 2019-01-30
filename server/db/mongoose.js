var mongoose = require('mongoose')

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp'
mongoose.connect(url, {useNewUrlParser: true})

module.exports = {
    mongoose
}