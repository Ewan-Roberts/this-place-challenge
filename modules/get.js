"use strict";

const event = require('./event'),
	request = require('request'),
	test = require('./testDetails');

//Set from test.js variables
let address = test.website;

//Simple wrapper for a get takes the path and can callback to move to the next step
event.on("get", (path,callback) => {

	request.get({
		url:address+path,
		method:'GET'
	},(error, response, body) =>{
		if (error) throw error

		callback(response)

	});

})