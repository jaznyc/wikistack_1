const express = require('express'); 
const router = express.Router();
const addPage = require('../views/addPage')
const { Page } = require("../models");
const { User } = require("../models");
const wikiPage = require("../views/wikipage")
const main = require('../views/main')

router.get('/', async (req, res) =>{
    const allPages = await Page.findAll()
    console.log(allPages)
    res.send(main(allPages))
   
})

router.post('/', async(req, res, next)=>{

    try {
        
        const user = await User.findOrCreate({
                where: {name: req.body.name},
                defaults:{email: req.body.email}
                 })
        

        const page = await Page.create({
          title: req.body.title,
          content: req.body.content
        });
        console.log(user)
        page.setAuthor(user[0])
        // make sure we only redirect *after* our save is complete! Don't forget to `await` the previous step. `create` returns a Promise.
        res.redirect(`/wiki/${page.slug}`);
    } catch (error) { next(error) }
       
})

router.get('/add', (req, res)=>{
    res.send(addPage())
   
})

router.get('/:slug', async (req, res, next) => {
    let slug = req.params.slug
    
    console.log(slug)
    const foundPage = await Page.findOne({
        where: {slug: req.params.slug}
      })
      
    res.send(wikiPage(foundPage))
  });

module.exports = router;