/**
 * Created by Angad on 19 September 2022
 */

const locationService							=	require('../services/locationService');

exports.getLocation = async (req, res) => {
	try {
		let requestBody = { ...req.query };

		let response = await locationService.getLocation(requestBody);
		console.log(JSON.stringify({ serviceResponse: response }));

		if (response.success) {
			return res.status(200).send(JSON.stringify(response));
		}

		return res.status(401).send(JSON.stringify({ success: false, data: {}, error: response.error }));
	} catch (error) {
		console.error(JSON.stringify({ MESSAGE: "There was an error in fetch location" , ERROR: error, STACK: error.stack}));
		return res.status(500).send({
			success	: false,
			data		: {},
			message	: "Something Went Wrong!"
		});
	}
};
