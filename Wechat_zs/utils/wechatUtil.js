var qs = require('qs');
var request = require('request');


//基础支持的access_token
const getBasicAccessToken = function() {
  let queryParams = {
    'grant_type': 'client_credential',
    'appid': _config.wechatConfig.appId,
    'secret': _config.wechatConfig.appSecret
  };

  let wxGetAccessTokenBaseUrl = _config.wechatUrls.basicToken + qs.stringify(queryParams);
  let options = {
    method: 'GET',
    url: wxGetAccessTokenBaseUrl
  };
  return new Promise((resolve, reject) => {
    request(options, function(err, res, body) {
      if (res) {
        try {
          resolve(JSON.parse(body));
        } catch (err) {
          console.log(err)
        }
      } else {
        reject(err);
      }
    });
  })
};

//网页授权接口调用凭证的access_token
const getAuthAccessToken = function(code) {
  let queryParams = {
    'grant_type': 'authorization_code',
    'appid': _config.wechatConfig.appId,
    'secret': _config.wechatConfig.appSecret,
    'code': code
  };

  let wxGetAccessTokenBaseUrl = _config.wechatUrls.authToken + qs.stringify(queryParams);
  let options = {
    method: 'GET',
    url: wxGetAccessTokenBaseUrl
  };
  return new Promise((resolve, reject) => {
    request(options, function(err, res, body) {
      try {
        let _body = JSON.parse(body);
        if (_body.openid && !_body.errcode) {
          resolve(_body);
        } else {
          reject(_body);
        }
      } catch (error) {
        console.log(error);
      }
    });
  })
};

module.exports = {
  getBasicAccessToken: getBasicAccessToken,
  getAuthAccessToken: getAuthAccessToken
};