const express = require('express');
const router = express.Router();

 
router.get('/api/serverTesting', function(req, res, next)
{
    console.log('GET in testing');

    res.send('get functioning');
});

// working on better syntax
// ()=> ES6 is working
// not currently using next() middleware
router.post('/api/serverTesting', (req, res) => {
    console.log('POST in testing');
 
    res.status(400).json({
        'message':'post functioning'
    });
});

router.delete('/api/serverTesting', (req, res) => {
    console.log('DELETE in testing');

    res.status(400).json({
        'message': 'delete functioning'
    });
});

module.exports = router;
