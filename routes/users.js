const express = require('express'); 
const router = express.Router();
const userList = require('../views/userList')
const { User } = require("../models");
const { Page } = require("../models");
const userPages = require("../views/userPages")

router.get('/', async (req, res) =>{
    const allUsers = await User.findAll()
    console.log(allUsers)
    res.send(userList(allUsers))
   
})
router.get('/:id', async (req, res) =>{
    console.log("hit")
    const userObj = await User.findOne({
        where: {id: req.params.id}
    })
    console.log(userObj)
    
    const pages = await Page.findAll({
        where: {authorId: req.params.id}
    })
    
    res.send(userPages(userObj, pages))
   
})
module.exports = router;