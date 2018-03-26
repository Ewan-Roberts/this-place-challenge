"use strict";

const event = require('./event'),
	welcome = require('./welcome'),
	passThrough = require('./passThrough'),
	equation = require('./equation'),
	word = require('./word'),
	guess = require('./guess');

//returns bool true if the text contains the search term.
const triggerTest = (phrase,search) => {return new RegExp("(" + search + ")",'gi').test(phrase)}

//This hander takes whatever reply and pushes it down the right event trigger
event.on("looper", text=>{
	
	console.log("------new request----")
	console.log(text)

	//word question
	if(triggerTest(text,"DONE")) {throw "boom boom"}

	//word question
	if(triggerTest(text,"Guess a number question")) {event.emit("guessSetUp",text)}

	//passThrough question
	if(triggerTest(text,"first question|starting the challenge!|Correct!")) {event.emit("passThrough",text)}

	//equation question
	if(triggerTest(text,"Arithmetic question")) {event.emit("equation",text)}

	//word question
	if(triggerTest(text,"word question")) {event.emit("word",text)}



})








