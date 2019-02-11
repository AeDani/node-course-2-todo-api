const expect = require('expect')
const request = require('supertest')
const {ObjectId} = require('mongodb')

const {app} = require('./../server')
const {Todo} = require('./../models/todo')
const {User} = require('./../models/user')

const {todos, populateTodos, users, populateUsers} = require('./seed/seed')

beforeEach(populateUsers)
beforeEach(populateTodos)

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test to do text'
        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text)
            })
            .end((err, res) => {
                if(err){
                    return done(err)
                }
                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1)
                    expect(todos[0].text).toBe(text)
                    done()
                }).catch((e) => done(e))
            })
    })

    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if(err){
                    return done(err)
                }

            Todo.find().then((todos) => {
                expect(todos.length).toBe(2)
                done()
            }).catch((e) => done(e))
        })
    })
})


describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2)
            }).end(done)
    })
})

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text)
            }).end(done)
    })

    it('should return 404 if todo not found', (done) =>{
        // make sure you get a 404 back
        request(app)
            .get(`/todos/${new ObjectId().toHexString()}`)
            .expect(404)
            .end(done)
    })

    it('should return 404 for non-object ids', (done) => {
        // /todos/123
        request(app)
            .get(`/todos/123abc`)
            .expect(404)
            .end(done)
    })
})


describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        var hexID = todos[1]._id.toHexString()
        request(app)
            .delete(`/todos/${hexID}`)
            .expect(200)
            .expect((res) =>{
                expect(res.body.todo._id).toBe(hexID)
            })
            .end((err,res)=>{
                if(err){
                    return done(err)
                }
                // query database findbyid toNotExist
                Todo.findById(hexID).then((todo) => {
                    expect(todo).toNotExist
                    done()
                }).catch((e) => done(e))
            })
    })

    it('should return 404 if todo not found', (done) => {
                // make sure you get a 404 back
                request(app)
                .delete(`/todos/${new ObjectId().toHexString()}`)
                .expect(404)
                .end(done)
    })

    it('should return 404 if ObjectId is invalid',(done) => {
               // /todos/123
               request(app)
               .delete(`/todos/123abc`)
               .expect(404)
               .end(done)
    })
})

describe('PATCH /todos/:id', ()=> {
    it('should update the todo', (done)=> {
        var hexId = todos[0]._id.toHexString()
        var text = 'test case text updated'
        var completed = true
        request(app)
            .patch(`/todos/${hexId}`)
            .send({
                text,
                completed
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text)
                expect(res.body.todo.completed).toBe(completed)  
                expect(typeof res.body.todo.completedAt).toBe('number')  
            })
            .end(done)
    })

    it('should clear completedAt when todo is not completed', (done) => {
        var hexId = todos[0]._id.toHexString()
        var text = 'test case 2 text updated'
        var completed = false
        request(app)
            .patch(`/todos/${hexId}`)
            .send({
                text,
                completed
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text)
                expect(res.body.todo.completed).toBe(completed)
                expect(res.body.todo.completedAt).toNotExist
            })
            .end(done)
    })
})


describe('GET /users/me', () => {
    it('should return user if authenticated', (done) => {
        request(app)
            .get('/users/me')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body._id).toBe(users[0]._id.toHexString())
                expect(res.body.email).toBe(users[0].email)
            })
            .end(done)
    })

    it('should return 401 if not authenticated', (done) => {
        request(app)
            .get('/users/me')
            .expect(401)
            .expect((res) => {
                expect(res.body).toEqual({})
            })
            .end(done)
    })
})


describe('POST /users', () => {
    it('should save a valid user', (done) => {
        var email = 'andrew@example.com'
        var password = '123!abc'

        request(app)
            .post('/users')
            .send({email, password})
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toExist
                expect(res.body._id).toExist
                expect(res.body.email).toBe(email)
            })
            .end((err) => {
                if(err){
                    return done(err)
                }

                User.findOne({email}).then((user) => {
                    expect(user).toExist
                    expect(user.password).not.toBe(password)
                    done()
                }).catch((e) => {
                    console.log(e)
                })
            }) 
    })

    it('should return validation errors if request invalied', (done) => {
        var email = 'dkdkkd'
        var password = '1'
        request(app) 
            .post('/users')
            .send({email, password})
            .expect(400)
            .end(done)
    })


    it('should not create user if email in use', (done) => {
        var email = 'dani@ex.com'
        var password = 'abc!123'
        request(app) 
            .post('/users')
            .send({email, password})
            .expect(400)
            .end(done)
    })
})