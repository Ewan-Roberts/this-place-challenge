"use strict";

const event = require('./event'),
    pathfinder = require('./pathfinder'),
    post = require('./post'),
    request = require('request');

let wordGame = res => {return (res[1] === "first")?res[3].substr(0, res[2]):res[3].substr(res[3].length-res[2])}

let searchRegex = /(first|last) ([0-9]+).*?\"([a-z]+)\"/g

event.on("word", input => {
    
    const path = pathfinder(input)

    const phrases = input.match(searchRegex);

    const match = searchRegex.exec(phrases);

    const guess = wordGame(match)

    console.log('Word question time!')
    console.log('-------------------------')
    console.log("the test is " + input)
    console.log("my guess is " + guess)
    
    event.emit("post",path,{answer:guess}, res=>{

        event.emit("looper",res.body)

    })

})


