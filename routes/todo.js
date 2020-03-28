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
  // res.send('列出全部 Todo')
})

// 新增一筆 Todo 頁面 (取消)
router.get('/new', (req, res) => {
  res.send('新增一筆 Todo')
})

// 顯示一筆 Todo 的詳細內容
router.get('/:id', (req, res) => {
  console.log('顯示一筆 Todo')
  // res.send('顯示一筆 Todo')
})

// 新增一筆  Todo
router.post('/', (req, res) => {
  console.log('新增一筆 Todo')
  // res.send('新增一筆 Todo')
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