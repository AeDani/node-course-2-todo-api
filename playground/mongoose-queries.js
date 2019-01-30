const {ObjectId} = require('mongodb')

const {mongoos} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user')

// var id = '5c50c3c0abc334173cffddf9'

// if (!ObjectId.isValid(id)){
//     console.log('ID not valid')
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos:',todos)
// })

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo:', todo)
// })

// Todo.findById(id).then((todo) => {
//     if(!todo){
//         return console.log('Id not found')
//     }
//     console.log('Todo by ID:', todo)
// }).catch((e) => console.log(e))


var id = '5c50af3f1a38ac0450cc40a9'
User.findById(id).then((user) => {
    // User was not found
    if(!user){
        return console.log('User with ID not existing')
    }
    // User was found
    console.log('Found user by ID:', user)
// Error
}, (e) => console.log(e))






