const express = require('express')
const router = express.Router()

// 載入 model
const db = require('../models')
const Todo = db.Todo
const User = db.User

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

// 修改 Todo 名稱
router.put('/:id', (req, res) => {
  Todo.findOne({
    where: {
      Id: req.params.id,
      UserId: req.user.id,
    }
  })
    .then((todo) => {
      todo.name = req.body.name
      return todo.save()
    })
    .then((todo) => { return res.send({ success: true }) })
    .catch((error) => { return res.status(422).json(error) })
})

// 修改 Todo 為 Done
router.put('/:id/done', (req, res) => {
  Todo.findOne({
    where: {
      Id: req.params.id,
      UserId: req.user.id,
    }
  })
    .then((todo) => {
      todo.done = true
      return todo.save()
    })
    .then((todo) => { return res.send({ success: true }) })
    .catch((error) => { return res.status(422).json(error) })
})

// 取消 Done 變回 Todo
router.put('/:id/cancel-done', (req, res) => {
  Todo.findOne({
    where: {
      Id: req.params.id,
      UserId: req.user.id,
    }
  })
    .then((todo) => {
      todo.done = false
      return todo.save()
    })
    .then((todo) => { return res.send({ success: true }) })
    .catch((error) => { return res.status(422).json(error) })
})

// 刪除 Todo
router.delete('/:id/delete', (req, res) => {
  console.log(`刪除 ${req.params.id}`)
  User.findByPk(req.user.id)
    .then((user) => {
      if (!user) throw new Error("user not found")

      return Todo.destroy({
        where: {
          UserId: req.user.id,
          Id: req.params.id
        }
      })
    })
    .then((todo) => {
      return res.send({ success: true })
    })
    .catch((error) => { return res.status(422).json(error) })
})

module.exports = router