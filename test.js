const express = require("express");
const morgan = require("morgan");
const layout = require("./views/layout");
const { db } = require('./models');
const users = require('./routes/users')
const wiki = require('./routes/wiki')
const test = express()

test.use(express.urlencoded({ extended: false }));
test.use(morgan("dev"));
test.use(express.static(__dirname + "/public"));
test.use('/users', users)
test.use('/wiki', wiki)

test.get('/', (req,res,next) => {
    res.redirect('/wiki')
   next()
})
test.get('/', (req,res) => {
    
    res.layout('')

})
const connect = async()=>{
    await db.sync()
}
connect()

test.listen(3000,()=>{
     console.log('APP listening in port 3000')
})

db.authenticate()
  .then(() => {
    console.log('connected to the database');
  })