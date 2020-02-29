const express = require('express');
const router = express.Router();

router.post('/api/logout', function(req, res, next)
{
	console.log('Express: POST /api/logout');

	const authToken = req.cookies.session;

	if (authToken)
		res.clearCookie('session').json({success: true});
	else
		res.status(200).json({success: true});
});

module.exports = router;