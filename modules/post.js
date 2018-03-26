"use strict";

const event = require('./event'),
	request = require('request'),
	test = require('./testDetails');

//Set from test.js variables
let address = test.website;

//Simple wrapper for a post takes the link and answer "key" and can callback to move to the next step
event.on("post", (link,key,callback) => {
	console.log(key)
	request.post({

		url:address+link,
		method:"POST",
		form: key

	}, (error, response, body) =>{
		if (error) throw error
		callback(response)

	});

})
