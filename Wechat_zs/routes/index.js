var express = require('express');
var router = express.Router();
var qs = require('qs');
var url = require('url');
var utils = require('../utils/wechatUtil.js');


/* GET home page. */
router.get('/', function(req, res, next) {
	var params = url.parse(req.url, true).query;
	console.log(params)
	if (!params.code) {
		let queryParams = {
			'appid': _config.wechatConfig.appId,
			'redirect_uri': _config.wechatConfig.return_uri,
			'response_type': 'code',
			'scope': 'snsapi_base',
			'state': 'STATE'
		};
		let url = _config.wechatUrls.getCode + qs.stringify(queryParams) + '#wechat_redirect';
		res.redirect(url);
	} else {
		res.render('index');
	}
});


module.exports = router;