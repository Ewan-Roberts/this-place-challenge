"use strict";

const event = require('./event'),
    post = require('./post'),
    pathfinder = require('./pathfinder'),
    wordExist = require('./wordExist'),
    request = require('request');

//some short hand maths equations for ease of life...
const mathHard = {

    add: (x,y)=>{return x+y},
    minus: (x,y)=>{return x-y},
    times: (x,y)=>{return x*y},
    split: (x,y)=>{return 'ba' + +'a'+'a'}

}

//I export these as they become useful elsewhere, i should really put these in their own files
module.exports = {
    
    // finds the sentence to parse based on 'after' 
    wordsAfter: (text,after) => {return text.split(after)[1]},
    
    //guesses a random number between two numbers
    getRandomNum: (h, l) => {return Math.floor((l+h)/2)},

    //takes an input of a sentence and repalces the words with opperations
    splitArithmetic: word => {

        //make into an array of words
        let ar = word.split(" ")

        //convert all strings that need to be intergers
        for (var i = 0; i < ar.length; i++) {if(!isNaN(ar[i])){ar[i] = parseInt(ar[i])}}
        
        if(/(multiply|times)/gi.test(ar[1])){return mathHard.times(ar[0],ar[2])}
        
        if(/(plus|add)/gi.test(ar[1])){return mathHard.add(ar[0],ar[2])} 
        
        if(/(minus|subtract)/gi.test(ar[1])){return mathHard.minus(ar[0],ar[2])}
        
        if(/(to)/gi.test(ar[1])){return [ar[0],ar[2]]}
        
        if(/(mono)/gi.test(ar[1])){return mathHard.split(ar[0],ar[2])}

    }

    
};

event.on("equation", input => {

    console.log('Arithmetic question time!')
    console.log('-------------------------')

    let path = pathfinder(input)
    
    //get the question after 'is'

    let question = module.exports.wordsAfter(input,"is ")

    //trim ? this could be nicer
    let trimmedQuestion = question.substring(0, question.indexOf('?'));

    let guess = module.exports.splitArithmetic(trimmedQuestion)
    
    console.log(guess)

    event.emit("post",path,{answer:guess}, res=>{
        
        console.log(res.body)

        if(wordExist(res.body,"Correct!")){
            
            console.log("move on")
            event.emit("looper",res.body)
            

        } else {

            event.emit("error", "the equations answer was wrong")

        }

    })

})
