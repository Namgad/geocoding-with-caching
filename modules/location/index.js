/**
 * Created by Angad on 19 September 2022
 */

const locationValidator								=	require('./validators/locationValidator');
const locationController							=	require('./controllers/locationController');

router.get("/location", locationValidator.locationValidator, locationController.getLocation);

router.get('/ping', function(req, res) {
	res.send('OK!');
});
