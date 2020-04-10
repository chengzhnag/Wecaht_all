var express = require('express');
var router = express.Router();
var qs = require('qs');
var url = require('url');
var utils = require('../utils/wechatUtil.js');
const Users = require('../controller/user/user.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.status(200).json({
		Code: 1,
		Message: 'Api Index',
		Data: ''
	})
});

router.get('/getToken', function(req, res, next) {
	var params = url.parse(req.url, true).query;
	if (params.code) {
		utils.getAuthAccessToken(params.code).then(resp => {
			res.status(200).json({
				Code: 1,
				Message: 'Success',
				Data: resp
			})
		}).catch(err => {
			res.status(200).json({
				Code: 0,
				Message: err.errmsg,
				Data: err
			})
		})
	} else {
		res.status(200).json({
			Code: 0,
			Message: '缺少code参数',
			Data: ''
		})
	}
});

router.get('/getUserInfo', function(req, res, next) {
	var params = url.parse(req.url, true).query;
	Users.getUserInfo(params.openid).then(resp => {
		res.send({
			Code: 1,
			Message: '获取用户信息成功',
			Data: resp
		})
	}).catch(err => {
		res.send({
			Code: 0,
			Message: '获取用户信息失败',
			Data: ''
		})
	});
})


router.post('/register', Users.saveUser);

router.post('/updateUser', Users.upDateUser);

module.exports = router;