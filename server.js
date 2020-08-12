const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const app = express()

mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

//writing code in ejs -> converted to view engine
app.set('view engine', 'ejs')

//cmd to use the Article router
//the '/articles' <-- is to place everything in /articles
app.use(express.urlencoded({ extended: false }))



app.get('/', async (req, res) => {
    //sorting article to the top of the page -> newest on top
    const articles = await Article.find().sort({
        createdAt: 'desc'
    })
    res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(5000)