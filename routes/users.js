const express = require('express'); 
const router = express.Router();
const userList = require('../views/userList')
const { User } = require("../models");
const { Page } = require("../models");
const wikiPage = require("../views/wikipage")
const main = require('../views/main')

router.get('/', async (req, res) =>{
    const allUsers = await User.findAll()
    console.log(allUsers)
    res.send(userList(allUsers))
   
})
router.get('/:id', async (req, res) =>{
    const userPages = await Page.findAll({
        where: {authorId: req.params.id}
    })
    console.log(userPages)
    res.send(main(userPages))
   
})
module.exports = router;