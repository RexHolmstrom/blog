const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const app = express()

mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true, useUnifiedTopology: true })

//writing code in ejs -> converted to view engine
app.set('view engine', 'ejs')

//cmd to use the Article router
//the '/articles' <-- is to place everything in /articles
app.use(express.urlencoded({ extended: false }))



app.get('/', async (req, res) => {
    const articles = await Article.find()
    res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(5000)