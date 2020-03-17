var express = require('express')
var router = express.Router()
/*specify api path*/
router.get('/hello', (req, res) => {
	res.json('hello world')
})

module.exports = router