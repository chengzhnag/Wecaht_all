'use strict';

module.exports = {
	port: parseInt(process.env.PORT, 10) || 9000,
	url: 'mongodb://localhost:27017/wechat',
	session: {
		name: 'ZS',
		secret: 'ZS',
		cookie: {
			httpOnly: true,
			secure: false,
			maxAge: 365 * 24 * 60 * 60 * 1000,
		}
	},
	wechatConfig: {
		appId: 'wx62cf1dea641df944',
		appSecret: '28458c84c27481c3057b3775a0558ca3',
		return_uri: 'http://zsjustn.top'
	},
	wechatUrls: {
		basicToken: 'https://api.weixin.qq.com/cgi-bin/token?',
		getCode: 'https://open.weixin.qq.com/connect/oauth2/authorize?',
		authToken: 'https://api.weixin.qq.com/sns/oauth2/access_token?'
	},
	uploadDir: '/uploads/',
	uploadPath: './public/uploads',
	uploadUrl: 'http://192.168.0.149:9000'
}