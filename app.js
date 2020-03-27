// app.js

const express = require('express')
const app = express()

const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

const db = require('./models')
const Todo = db.Todo
const User = db.User

// 設定路由
app.use('/', require('./routes/home'))
// 認證系統的路由
// 登入頁面
app.use('/users', require('./routes/user'))

// 設定 express port 3000
app.listen(port, () => {
  console.log(`App is running on port ${port}!`)
})