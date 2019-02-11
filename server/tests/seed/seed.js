const {ObjectId} = require('mongodb')
const jwt = require('jsonwebtoken')

const {Todo} = require('./../../models/todo')
const {User} = require('./../../models/user')

const userOneId = new ObjectId()
const userTwoId = new ObjectId()

const users = [{
    _id: userOneId,
    email: 'dani@ex.com',
    password: 'userOnePass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
        }
    ]
},{
    _id: userTwoId,
    email: 'stefi@ex.com',
    password: 'userTwoPass',
}]

const todos = [{
    _id: new ObjectId(),
    text: 'first test to do'
},{
    _id: new ObjectId(),
    text: 'second test to do',
    completed: true,
    completedAt: 333
}]

const populateTodos = (done) => {
    Todo.deleteMany({}).then(() => {
        return Todo.insertMany(todos)
    }).then(() => done())
}

const populateUsers = (done) => {
    User.remove({}).then(() => {
        var userOne = new User(users[0]).save()
        var userTwo = new User(users[1]).save()

        return Promise.all([userOne, userTwo])
    }).then(() => done())
}

module.exports = {todos, populateTodos, users, populateUsers}