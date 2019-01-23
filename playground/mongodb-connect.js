// // ES6 destructuring object
// var user = {
//     name: 'daniel',
//     age:25
// }
// var {name} = user
// console.log(name)

//const MongoClient = require('mongodb').MongoClient
const {MongoClient, ObjectID} = require('mongodb')

// // create a mongodb id without adding
// var obj = new ObjectID();
// console.log(obj)

var url = 'mongodb://localhost:27017/TodoApp'
MongoClient.connect(url,(err, client) => {
    if(err){
        return console.log('Unable to connect to mongo-db server')
    }
    console.log('Connected to the mongo-db server')
    const db = client.db('TodoApp')
    
    // // insert a new todo in the todos collection into the 
    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err,result) => {
    //     if(err){
    //         return console.log('Unable to insert todo',err)
    //     }
    //     console.log(JSON.stringify(result.ops[0], undefined,2))
    // })

    // // insert at user into the users collection
    // db.collection('Users').insertOne({
    //     name: 'dani',
    //     age: '38',
    //     location: 'bern'
    // }, (err, result) => {
    //     if(err){
    //         return console.log('could not insert user')
    //     }
    //     console.log('insert user successfully', JSON.stringify(result.ops[0],undefined,2))
    //     console.log('created at:', result.ops[0]._id.getTimestamp())
    // })

    // close connection to the db server
    client.close()
})

