const express = require('express')
const router = express.Router()

// 載入 model
const db = require('../models')
const Todo = db.Todo
const User = db.User

// 載入 auth middleware
const { authenticated } = require('../config/auth')

// 設定 /todos 路由
// 列出全部 Todo
router.get('/', (req, res) => {
  console.log('列出全部 Todo')
  User.findByPk(req.user.id)
    .then((user) => {
      if (!user) throw new Error("user not found")

      return Todo.findAll({
        raw: true,
        nest: true,
        where: { UserId: req.user.id }
      })
    })
    .then((todos) => { return res.render('index', { todos: todos }) })
    .catch((error) => { return res.status(422).json(error) })
})

// 顯示一筆 Todo 的詳細內容
router.get('/:id', (req, res) => {
  console.log(`顯示一筆 Todo, user:${req.user.id}, todo:${req.params.id}`)

  User.findByPk(req.user.id)
    .then((user) => {
      if (!user) throw new Error("user not found");

      return Todo.findOne({
        where: {
          UserId: req.user.id,
          Id: req.params.id
        }
      })
    })
    .then((todo) => { return res.send(todo) })
    .catch((error) => { return res.status(422).json(error) })
})

// 新增一筆  Todo
router.post('/', (req, res) => {
  console.log(req.body)
  console.log(`新增一筆 Todo , user_id = ${req.user.id}`)

  Todo.create({
    name: req.body.name,
    done: false,
    UserId: req.user.id
  })
    .then((todo) => { return res.send(todo) })
    .catch((error) => { return res.status(422).json(error) })
})

// 修改 Todo 頁面 (取消)
router.get('/:id/edit', (req, res) => {
  res.send('修改 Todo 頁面')
})

// 修改 Todo
router.put('/:id', (req, res) => {
  console.log(`修改 ${req.params.id}`)
})

// 刪除 Todo
router.delete('/:id/delete', (req, res) => {
  console.log(`刪除 ${req.params.id}`)
  // res.send('刪除 Todo')
})

module.exports = router