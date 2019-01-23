//const MongoClient = require('mongodb').MongoClient
const {MongoClient, ObjectID} = require('mongodb')

var url = 'mongodb://localhost:27017/TodoApp'
MongoClient.connect(url,(err, client) => {
    if(err){
        return console.log('Unable to connect to mongo-db server')
    }
    console.log('Connected to the mongo-db server')
    const db = client.db('TodoApp')
    
    // find/fetch all data in a collection
    db.collection('Todos').find().toArray().then((docs) => {
        console.log('All Todos')
        console.log(JSON.stringify(docs, undefined, 2))
    }, (err) => {
        console.log('unable to fecth todos', err)
    })

    // fetch all todos that have completed:true
    db.collection('Todos').find({completed:true}).toArray().then((docs) => {
        console.log('Todos not completed')
        console.log(JSON.stringify(docs, undefined, 2))
    }, (err) => {
        console.log('unable to fecth todos', err)
    })

    // fetch by ID
    db.collection('Todos').find({
        _id: new ObjectID('5c48641ea0fdc1a22aac404d')
    }).toArray().then((docs) => {
        console.log('Todos by ID')
        console.log(JSON.stringify(docs, undefined, 2))
    }, (err) => {
        console.log('unable to fecth todos', err)
    }) 

    // count docs
    db.collection('Todos').find().count().then((count) => {
        console.log(`Todos by count: ${count}`)
    }, (err) => {
        console.log('unable to fecth todos', err)
    }) 

    // fetch by user name
    db.collection('Users').find({name: 'dani'})
    .toArray()
    .then((docs)=> {
        console.log('By user name dani:')
        console.log(JSON.stringify(docs,undefined,2))
    },err => {
        console.log('unable to fetch by user name', err)
    })

    // close connection to the db server
    // client.close()




})

