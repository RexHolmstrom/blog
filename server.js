const express = require('express')
const articleRouter = require('./routes/articles')
const app = express()

//writing code in ejs -> converted to view engine
app.set('view engine', 'ejs')

//cmd to use the Article router
//the '/articles' <-- is to place everything in /articles
app.use('/articles', articleRouter)

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(5000)