"use strict";

const event = require('./event'),
    pathfinder = require('./pathfinder'),
    post = require('./post'),
    get = require('./get'),
    test = require('./testDetails'),
    passThrough = require('./passThrough'),
    request = require('request');

//Pulls from test details file
const username = test.name;

event.on("welcome", input => {

    //scraps the path from the input
    let path = pathfinder(input)

    console.log('Welcome time!')
    console.log('-------------------------')
    console.log('Hi, my name is '+ username)
    console.log("send to "+path)

    event.emit("post",path,{name:username}, res=>{
        
        event.emit("looper",res.body)

    })

})

//to start
let path = "/"

event.emit("get",path, res=>{
    
    event.emit("welcome", res.body);

    // event.emit("looper",res.body)

})