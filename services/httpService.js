/**
 * Created by Angad on 19 September 2022
 */

"use strict";

const axios         = require('axios');
const http 					= require("http");

const initializeServer = (port) => {
	return new Promise((resolve, reject) => {
		let server = http.createServer(app).listen(port, function () {
			console.error("###################### Express App Connected ##################", port);
			resolve(server);
		});
	});
};

const sendHttpRequest = async (opts) => {
	let response = { success: false };
	try {
		let options  = { ...opts.options };
		let serviceResponse = await axios(options);
		console.log(JSON.stringify({ HTTP_REQUEST: options, CALLING_URL: '<###############################>' + options.url }));

		if (serviceResponse.status == 200) {
			response.status  	= 200;
			response.success 	= true;
			response.data 		= serviceResponse && serviceResponse.data;
			if(response.data.data)
				response.data 	= response.data.data;
		} else {
			response.status   = serviceResponse.status;
			response.success  = false;
			response.data     = serviceResponse && serviceResponse.data && serviceResponse.data.data;
			response.error    = serviceResponse && serviceResponse.data && serviceResponse.data.message;
		}
		return response;
	} catch (error) {
		console.error(JSON.stringify(error));
		let serviceResponse = error.response;

		response.status   = serviceResponse.status;
		response.success  = false;
		response.data     = serviceResponse && serviceResponse.data && serviceResponse.data.data;
		response.error    = serviceResponse && serviceResponse.data && serviceResponse.data.message;
		return response;
	}
};

exports.sendHttpRequest             = sendHttpRequest;
exports.startHttpServer 						= initializeServer;
