/**
 * Created by Angad on 19 September 2022
 */

const httpService													=	require('../../../services/httpService');
const config															=	require('config');

const NodeCache														=	require('node-cache');
const myCache															=	new NodeCache();

exports.getLocation = async (opts) => {
	let response = { success: false };
	console.log(JSON.stringify({ EVENT: "Get Location Response", OPTS: opts }));

	if (myCache.has(opts.location)) {
		response.success	=	true;
		response.data			=	myCache.get(opts.location);
		return response;
	} else {
		let params = {
			key: config.get('GOOGLE_API_KEY'),
			address: opts.location
		};
		console.log(JSON.stringify({EVENT: "Google Geocoding API Service", PARAMS: params}))

		let options = {
			method	: "GET",
			url			: "https://maps.googleapis.com/maps/api/geocode/json",
			params	: params
		}
		let httpResp = await httpService.sendHttpRequest({options});

		console.log(JSON.stringify({EVENT: "Google Geocoding API Response", RESULT: httpResp}));

		myCache.set(opts.location, httpResp.data.results[0].geometry.location);

		response.success	=	true;
		response.data			=	httpResp.data.results[0].geometry.location;
		return response;
	}
}
