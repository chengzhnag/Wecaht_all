const config = {
	appId: 'wx62cf1dea641df944',
	appSecret: '28458c84c27481c3057b3775a0558ca3',
	return_uri: 'http://zsjustn.top'
}

const wechatUrls = {
	basicToken: 'https://api.weixin.qq.com/cgi-bin/token?',
	getCode: 'https://open.weixin.qq.com/connect/oauth2/authorize?',
	authToken: 'https://api.weixin.qq.com/sns/oauth2/access_token?'
}


module.exports = {
    config: config,
    wechatUrls: wechatUrls
};