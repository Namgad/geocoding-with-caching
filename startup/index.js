/**
 * Created by Angad on 19 September 2022
 */

const httpLib                 = require('./../services/httpService');
const config									=	require('config')

const initializeServer = async () => {

	try {
		//initialize all db connections
		const server = await httpLib.startHttpServer(config.get('PORT'));
	} catch (error) {
		console.error(JSON.stringify({ EVENT: "initializeServer", ERROR: error }));
		throw new Error(error);
	}
};

exports.initializeServer  = initializeServer;


const http										=	require('http');
