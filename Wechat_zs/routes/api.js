var express = require('express');
var router = express.Router();
const Users = require('../controller/user/user.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.status(200).json({
		Code: 1,
		Message: 'Api Index',
		Data: ''
	})
});

router.get('/getToken', Users.getToken);

router.get('/getUserInfo', Users.getUserInfo);

router.post('/register', Users.saveUser);

router.post('/updateUser', Users.upDateUser);

module.exports = router;