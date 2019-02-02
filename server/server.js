var express = require('express')
var bodyParser = require('body-parser')
const {ObjectId} = require('mongodb')

var {mongoose} = require('./db/mongoose')
var {Todo} = require('./models/todo')
var {User} = require('./models/user')

var app = express()
const port = process.env.PORT || 3000

// Middleware
app.use(bodyParser.json())

// ---- Routes
// POST a todo
app.post('/todos', (req, res) => {
    // console.log(req.body)
    var todo = new Todo({
        text: req.body.text
    })

    todo.save().then((doc) => {
        res.send(doc)
    }, (e) => {
        res.status(400).send(e)
    })
})

// GET  all todos
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos})
    }, (e) => {
        res.status(400).send(e)
    })
})

// GET one todo by id
app.get('/todos/:id', (req, res) => {
    var id = req.params.id
    // res.send(id)
    // Validate ID using
    if(!ObjectId.isValid(id)){
        // Status 404 - empty body
        return res.status(404).send('not valid id')
    }

    // Find by ID 
    Todo.findById(id).then((todo)=> {
        // if there is no todo - status 404 - empty body
        if(!todo){
            return res.status(404).send('not found id in db')
        }
        // success
        // if there is todo - send it back
        res.send({todo})
    }, (e) => {
        // error - status 400 - empty body
        res.status(400).send()
    })
})


// DELETE route
app.delete('/todos/:id', (req, res) => {
    // get the id
    var id = req.params.id

    // validate the id 
    if (!ObjectId.isValid(id)) {
        // not valid id -> return 404
        return res.status(404).send('not valid id')
    }

    // find remove by id
    Todo.findByIdAndRemove(id).then((todo) => {
        // sucess
        if (!todo) {
            // if no doc gets back -> return 404
            return res.status(404).send('no doc to remove')
        }
        // if removed -> return doc
        res.send({ todo })

    }, (e) => {
        // error -> return 404
        res.status(404).send()
    })
})


app.listen(port, () => {
    console.log(`Started on port ${port}`)
})


module.exports = {app}