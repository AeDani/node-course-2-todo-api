//const MongoClient = require('mongodb').MongoClient
const {MongoClient, ObjectID} = require('mongodb')

var url = 'mongodb://localhost:27017/TodoApp'
MongoClient.connect(url,(err, client) => {
    if(err){
        return console.log('Unable to connect to mongo-db server')
    }
    const db = client.db('TodoApp')
    // deleteMany
    db.collection('Todos')
    .deleteMany({text: 'eat lunch'})
    .then((result) => {
        console.log(result.result)
    })

    // deleteOne - deletes the first one an then stops
    db.collection('Todos')
    .deleteOne({text: 'Eat lunch'})
    .then((result) => {
        console.log(result.result)
    })

    // findOneAndDelete
    db.collection('Todos')
    .findOneAndDelete({completed: false})
    .then((result) => {
        console.log(result)
    })

    db.collection('Users')
    .findOneAndDelete({_id: new ObjectID("5c48624320bd900348d6a895")})
    .then((docs) => {
        console.log(docs)
    })

    // close connection to the db server
    // client.close()
})

