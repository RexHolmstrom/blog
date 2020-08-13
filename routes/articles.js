const express = require('express');
const Article = require('./../models/article')
const router = express.Router();

router.get('/new', (req, res) => {
    res.render('articles/new', { article: new Article() })
})


router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug })
    //if article cant be found 
    //redirect to homepage 
    if (article == null) res.redirect('/')
    res.render('articles/show', { article: article })
})
//this is connected to mongoose
//creating new article 
router.post('/', async (req, res) => {
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown,
    })
    try {
        article = await article.save()
        //redirecting to //articles/id
        res.redirect(`/articles/${article.slug}`)
    } catch (e) {
        res.render('articles/new', { article: article })
    }
})


router.delete('/', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})


module.exports = router