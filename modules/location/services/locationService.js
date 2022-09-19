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

	let noCacheLocation = [];
	response.data		=	[];

	if (_.isArray(opts.location)) {
		opts.location.forEach(loc => {
			if (myCache.has(loc)) {
				response.data.push({place: loc, location: myCache.get(loc)})
			} else {
				noCacheLocation.push(loc);
			}
		});

		if (!_.isEmpty(noCacheLocation)) {
			let geoCodingResp = await geoCoding({location: noCacheLocation.toString()});
			console.log(JSON.stringify({ EVENT: "Fetch GeoCoding", RESPONSE: geoCodingResp }))
			if (!geoCodingResp.success) {
				return geoCodingResp;
			}

			geoCodingResp.data.results.forEach((resp, index) => {
				myCache.set(noCacheLocation[index], resp.geometry.location);

				response.data.push({place: noCacheLocation[index], location: resp.geometry.location});
			});
		}

		response.success	=	true;
	} else {
		if (myCache.has(opts.location)) {
			response.success	=	true;
			response.data			=	myCache.get(opts.location);
			return response;
		} else {
			let geoCodingResp = await geoCoding(opts);
			console.log(JSON.stringify({ EVENT: "Fetch GeoCoding", RESPONSE: geoCodingResp }))
			if (!geoCodingResp.success) {
				return geoCodingResp;
			}

			myCache.set(opts.location, geoCodingResp.data.results[0].geometry.location);

			response.success	=	true;
			response.data			=	{
				place		: opts.location,
				location: geoCodingResp.data.results[0].geometry.location
			};
		}
	}

	return response;
}

const geoCoding = async (opts) => {
	let response = { success: false };
	console.log(JSON.stringify({ EVENT: "Get GeoCoding", OPTS: opts }));

	let params = {
		key			: config.get('GOOGLE_API_KEY'),
		address	: opts.location
	};
	console.log(JSON.stringify({EVENT: "Google Geocoding API Service", PARAMS: params}))

	let options = {
		method	: "GET",
		url			: "https://maps.googleapis.com/maps/api/geocode/json",
		params	: params
	}
	let httpResp = await httpService.sendHttpRequest({options});

	console.log(JSON.stringify({EVENT: "Google Geocoding API Response", RESULT: httpResp}));

	if (httpResp.data.status != 'OK') {
		response.error	=	httpResp.data.error_message;
		return response;
	}

	response.success 	= true;
	response.data			=	httpResp.data;
	return response;
}
