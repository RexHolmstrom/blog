const express = require('express')
const mongoose = require('mongoose')
const articleRouter = require('./routes/articles')
const app = express()

mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true, useUnifiedTopology: true })

//writing code in ejs -> converted to view engine
app.set('view engine', 'ejs')

//cmd to use the Article router
//the '/articles' <-- is to place everything in /articles
app.use('/articles', articleRouter)
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    const articles = [{
        title: 'test article',
        createdAt: new Date(),
        description: 'test description'

    },
    {
        title: 'test article2',
        createdAt: new Date(),
        description: 'test description'

    }]
    res.render('articles/index', { articles: articles })
})

app.listen(5000)