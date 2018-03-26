"use strict";

const event = require('./event'),
    equation = require('./equation'),
    pathfinder = require('./pathfinder'),
    request = require('request');

//returns bool true if the text contains the search term.
const triggerTest = (phrase,search) => {return new RegExp("(" + search + ")",'gi').test(phrase)}

//Couple of easy globals
let number = {};
let guess = 0;

event.on("guess", (input,guess) => {

    console.log("high: "+number.high)
    console.log("low:" +number.low)
    
    if(triggerTest(input,"higher than|greater than")){

        number.low = guess

        guess = equation.getRandomNum(number.high,number.low);

        event.emit("post",number.path,{answer:guess}, res=>{
        
            console.log(res.body)
            event.emit("guess",res.body,guess)

        })

    }   

    if(triggerTest(input,"lower than|less than")){

        number.high = guess

        guess = equation.getRandomNum(number.high,number.low);

        event.emit("post",number.path,{answer:guess}, res=>{
        
            console.log(res.body)
            event.emit("guess",res.body,guess)

        })

    }

    if(triggerTest(input,"correct")){event.emit("looper","DONE")}


})

event.on("guessSetUp", input => {
    console.log(input)
    if(triggerTest(input,"from ")){
        
        console.log('Guess game time!')
        console.log('-------------------------')

        let guessBounds = equation.wordsAfter(input,"from ")
        
        //This gives you your high and low to start
        let range = equation.splitArithmetic(guessBounds)

        number = {

            low:range[0],
            high:range[1],
            path: pathfinder(input)

        }

    }

    guess = equation.getRandomNum(number.high,number.low);

    event.emit("post",number.path,{answer:guess}, res=>{

        event.emit("guess",res.body,guess)

    })

})












