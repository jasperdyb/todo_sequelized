const express = require('express')
const router = express.Router()

// 載入 model
const db = require('../models')
const Todo = db.Todo
const User = db.User

// 載入 auth middleware
const { authenticated } = require('../config/auth')

// 設定首頁路由
router.get('/', authenticated, (req, res) => {
  res.redirect('/todos')
})

module.exports = router