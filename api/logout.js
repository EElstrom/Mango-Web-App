const express = require('express');
const router = express.Router();

// clear out session cookie to finish logout
router.post('/api/logout', (req, res) => {
	console.log('Express: POST /api/logout');

	const authToken = req.cookies.session;

	if (authToken)
		res
			.clearCookie('session')
			.json({success: true});
	else
		res
			.status(200)
			.json({success: true});
});

module.exports = router;