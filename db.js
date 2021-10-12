'use strict'

const Database = require('better-sqlite3')

class Db {
    constructor(file) {
        this.db = new Database(file)

        this.createTables()
    }

    createTables(){
        let sql = ''

        sql = `CREATE TABLE IF NOT EXISTS users (
            id integer PRIMARY KEY,
            login text,
            email text, 
            password text
		)`
        this.db.prepare(sql).run()

        sql = `CREATE TABLE IF NOT EXISTS todoList (
            id integer PRIMARY KEY,
            heading text,
			textTask text,
            idUser integer,
            date text,
            completed text
		)`
        this.db.prepare(sql).run()
    }

    selectUsers(){
        return this.db.prepare(`SELECT * FROM users`).all()
    }

    selectUserById(id){
        return this.db.prepare(`SELECT * FROM users WHERE id = ?`).get(id)
    }

    selectUserByLogin(login){
        return this.db.prepare(`SELECT * FROM users WHERE login = ?`).get(login)
    }

    selectTodoListByUser(id){
        return this.db.prepare(`SELECT * FROM todoList WHERE idUser = ?`).all(id)
    }

    selectTodoListById(id){
        return this.db.prepare(`SELECT * FROM todoList WHERE id = ?`).get(id)
    }

    insertUser(user){
        if (user.login != null && user.password != null) {
            const stmt = this.db.prepare('INSERT INTO users (login, email, password) VALUES (?,?,?)').run(user.login, user.email, user.password)
            if (stmt.changes) {
                user.id = stmt.lastInsertRowid
                return user
            }
        }
        return null
    }

    insertTodoList(todoList){
        if (todoList.heading != null) {
            const stmt = this.db.prepare('INSERT INTO todoList (heading, textTask, idUser, date, completed) VALUES (?,?,?,?,?)').run(todoList.heading, todoList.textTask, todoList.idUser, todoList.date, todoList.completed)
            if (stmt.changes) {
                todoList.id = stmt.lastInsertRowid
                return todoList
            }
        }
        return null
    }

    updateTodoList(todoList){
        if (todoList != null) {
            const stmt = this.db.prepare(`UPDATE todoList SET heading = ?, textTask = ?, idUser = ?, date = ?, completed = ? WHERE id = ?`).run(todoList.heading, todoList.textTask, todoList.idUser, todoList.date, todoList.completed, todoList.id)
            if (stmt.changes) {
                return this.db.prepare(`SELECT * FROM todoList WHERE id = ?`).get(todoList.id)
            }
        }
        return null
    }

    deleteTodoList (id){
        return this.db.prepare('DELETE FROM todoList WHERE id = ?').run(id) 
    }
}

module.exports = Db