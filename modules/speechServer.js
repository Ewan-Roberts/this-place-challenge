
"use strict";

const request = require('request');

//Sets up the global event emitter for each event to hook to

const EventEmitter = require("events");

let event = new EventEmitter();

event.on("getNumberGameResponse", () => {

	// request.get({
		
	// 		url: 'http://ptsv2.com/t/cheese/post',

	// 		method: 'GET',

	// 	}, (error, response, body) => {

	//         console.log(response)

	//         console.log(" --------------------------------------------------- ")

	//         //easier to read... 
	//         console.log(response.toJSON())

	//         event.emit("urlInfo", response)

	//     }
	// );

})

event.on("urlInfo", info =>{

	//trim here

	event.emit("numberGame",info)

})

event.on("numberGame", input => {

	let number = {

		high: 30,
		low: 0,
		get range() {
			return [number.low,number.high]
		}

	}

	let guess = getRandomNum(number.high,number.low);

	const updateVariables = (sentence, guess) => {

		if(!Number.isInteger(guess)) throw "not an int?"

		//for the record i hate regex and dont know how to write it except this specific thing! 
		if(sentence.match(/^(higher than|greater than)/i)){number.low = guess}

		else if(sentence.match(/^(lower than|less than)/i)){number.high = guess}

		if(sentence.match(/^(correct)/)) {
			
			event.emit("numberGameAnswer", guess)

		 	console.log("correct answer is " + guess)



		}

	}

	// setInterval(()=>{

	// 	guess = getRandomNum(number.high,number.low);

	// 	response = resultIs(guess)

	// 	console.log("guess: " + guess)
	// 	console.log("response: " + response)
	// 	console.log("range: " + number.range)

	// 	updateVariables(response,guess)

	// },100)


})

event.on("numberGameAnswer",res =>{
	
	console.log(res)
	// event.emit("post",res)

})

event.emit("numberGame")

event.on("wordGame", input => {

	let string = "i like to poop in a feild wef 3 wfe 4 green first 3 and lasgergret thregreen last rerger be greedy for the first and then first 0 3 fte for the last first and 4"

	let cheese = string.match(/([a-z]+) (last|first) ([0-9]+)/gi)

	let result = {answer: cheese}

	// event.emit("post",result)

})

