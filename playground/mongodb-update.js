//const MongoClient = require('mongodb').MongoClient
const {MongoClient, ObjectID} = require('mongodb')

var url = 'mongodb://localhost:27017/TodoApp'
MongoClient.connect(url,(err, client) => {
    if(err){
        return console.log('Unable to connect to mongo-db server')
    }
    const db = client.db('TodoApp')
    
    // findOneAndupdate
    db.collection('Todos')
    .findOneAndUpdate({
        _id: new ObjectID('5c48641ea0fdc1a22aac404d')
    }, {
       $set: {
           completed: true
       } 
    }, {
        returnOriginal: false
    })
    .then((res) => {
        console.log(res)
    })


    db.collection('Users').findOneAndUpdate({
        _id : new ObjectID("5c48600e24885203253c72d1")
    }, {
        $set: {
            name: 'Maximilian'
        },
        $inc: { age: 1
        }
    }, {
        returnOriginal: false
    })
    .then((res) => {
        console.log(res)
    })





    // close connection to the db server
    // client.close()
})

