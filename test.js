const express = require("express");
const morgan = require("morgan");

const test = express()

test.use(express.urlencoded({ extended: false }));
test.use(morgan("dev"));
test.use(express.static(__dirname + "/public"));

test.get('/', (req,res) => {
    res.send("hello world")
})

test.listen(3000)

// ()=>{
//     console.log('APP listening in port 3000')
// }