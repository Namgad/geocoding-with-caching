/**
 * Created by Angad on 19 September 2022
 */

const Joi										=	require('joi');

const locationValidator = (req, res, next) => {
	let schema = Joi.object().keys({
		location	:	Joi.string().trim().required()
	});

	let reqBody = { ...req.query };

	let validation = schema.validate(reqBody, { allowUnknown: false });
	console.log(JSON.stringify(validation));
	if (validation.error) {
		res.status(400).send(JSON.stringify({
			message: validation.error.details[0].message,
			status : 400,
			data   : {}
		}));
		return false;
	} else
		next();
};

exports.locationValidator		=	locationValidator;
