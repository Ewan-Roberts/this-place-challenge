"use strict";

const event = require('./event'),
    request = require('request');

const URL = "http://ptsv2.com";
const uniqueID = "imUnique";

let extention = "/t/cheese/d/40002"

// let real = "http://dev-challenge.thisplace.com"
// let whatID = '/'

//start this exercise
// event.emit("get", real+whatID, info => {
    
//     event.emit("checkTest",info.body)

// })

//Maybe extend later 

module.exports = {findPath: text => {return text.match(/\/(.*?)+\w+(?=,| |)/g)[0]}};

request(real+whatID, (error, response, body) => {
    
    console.log(body)
    let path = module.exports.findPath(body)
    console.log(path)

});

event.on("checkTest", body =>{

    //finds the path in the text
    let path = module.exports.findPath(body)

    let fakeString = "welcome"

    //The welcome screen
    if(testChecker(body,"Welcome")){

        event.emit("welcome", body)

    }

    let fakeString = "proceed to the first"

    //find GET request in body
    if(testChecker(body,"proceed to the first")){

        request(real+path, (error, response, newBody) => {

            event.emit("checkTest",newBody)

        });

    }

    let fakeString = "Arithmetic question what is 4 plus 6"

    //Basic maths and parsing
    if(testChecker(body,"Arithmetic question")){

        let path = module.exports.findPath(body)

        event.emit("equation", path, body)

    }

    //guessy guessy time 
    let fakeString = "Guess a number question from 0 to 302 the onto "
    if(testChecker(body,"Guess a number")){

        let path = module.exports.findPath(body)

        event.emit("equation", path, body)

    }

})






