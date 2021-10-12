'use strict'

const express = require('express')
const DB = require('./db')

const db = new DB('user.sqlite')
const app = express()
const router = express.Router()

router.use(express.json())

router.get('/users', (req, res) => {
    console.log('get users')
    const users = db.selectUsers()
    if (users.length != 0){
        res.status(200).send({success: true, msg: 'ok', users})
    } else {
        res.status(200).send({success: false, msg: 'no users found'})
    }
})

router.post('/user', (req, res) => {
    console.log('user create', req.body)
    const user = db.insertUser(req.body)
    if (user) {
        res.status(200).send({success: true, msg: 'ok', user})
    } else {
        res.status(200).send({success: false, msg: 'no user added'})
    }
})

router.get('/user', (req, res) => {
    console.log('get user', req.query.login)
    const user = db.selectUserByLogin(req.query.login)
    if (user){
        res.status(200).send({success: true, msg: 'ok', user})
    } else {
        res.status(200).send({success: false, msg: 'no user found'})
    }
})

router.get('/todoList', (req, res) => {
    console.log('get todoList', req.query.id)
    const todoList = db.selectTodoListByUser(req.query.id)
    if (todoList.length != 0){
        res.status(200).send({success: true, msg: 'ok', todoList})
    } else {
        res.status(200).send({success: false, msg: 'no todoList found'})
    }
})

router.post('/todoList', (req, res) => {
    console.log('todoList create', req.body)
    const user = db.selectUserById(req.body.idUser)
    if (user) {
        const todoList = db.insertTodoList(req.body)
        if (todoList) {
            res.status(200).send({success: true, msg: 'ok', todoList})
        } else {
            res.status(200).send({success: false, msg: 'no todoList added'})
        }
    } else {
        res.status(404).send({success: false, msg: 'no user found'})
    }
})

router.put('/todoList', (req, res) => {
    console.log('todoList update', req.body)
    const todoList = db.updateTodoList(req.body)
    if (todoList){
        res.status(200).send({success: true, msg: 'ok', todoList})
    } else {
        res.status(200).send({success: false, msg: 'no todoList changed'})
    }
})

router.delete('/todoList', (req, res) => {
    console.log('todoList delete', req.query.id)
    const todoList = db.selectTodoListById(req.query.id)
    if (todoList){
        const stmt = db.deleteTodoList(req.query.id)
        if (stmt.changes){
            res.status(200).send({success: true, msg: 'ok', todoList})
        } else {
            res.status(200).send({success: false, msg: 'no todoList deleted'})
        }
        
    } else {
        res.status(200).send({success: false, msg: 'no todoList found'})
    }
})

app.use(router)

let port = 3000
let hostname = "0.0.0.0"

app.listen(port, hostname, function () {
    console.log('start api', `${port}НФТ`)
})