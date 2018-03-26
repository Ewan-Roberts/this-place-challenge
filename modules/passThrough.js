"use strict";

const event = require('./event'),
    get = require('./get'),
    pathfinder = require('./pathfinder'),
    looper = require('./looper'),
    request = require('request');

//This is to push the program through cases where you just need to find the link and continue
event.on("passThrough", input => {

    let path = pathfinder(input)

    //I like being really clear by using console logs for when people are looking at my code
    //I would avoid all this for in the real world
    console.log('pass through time!')
    console.log('-------------------------')
    console.log("the input is " + input)
    console.log("the path i need to follow is " + path)

    event.emit("get",path, res=>{
        
        console.log(res.body)
        console.log("hehehehe")

        event.emit("looper",res.body)
        

    })

})


