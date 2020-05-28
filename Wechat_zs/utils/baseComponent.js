const LoginLog = require('../models/loginLog/loginLog.js');

var _this;
module.exports = class BaseComponent {
	constructor() {
		_this = this;
	}

	copy(obj) {
		if (!obj) return obj;
		try {
			var result = JSON.parse(JSON.stringify(obj));
			return result;
		} catch (err) {
			console.log('copy err: ', err);
			return '';
		}
	}

	deletePassword(obj) {
		if (!obj) return obj;
		try {
			var result = JSON.parse(JSON.stringify(obj));
			delete result.password;
			return result;
		} catch (err) {
			console.log('deletePassword err: ', err);
			return '';
		}
	}

	localDate(v) {
		const d = new Date(v || Date.now());
		d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
		return d.toISOString();
	}

	returnErrMessage(res, msg, err) {
		return res.send({
			Code: 0,
			Message: msg,
			Data: err || '出现错误'
		})
	}

	// 插入登录日志
	insertLoginLog(data, req) {
		let param = {
		    userName: data.nickname,
		    landTime: _this.localDate(),
		    landIp: _this.getClientIP(req),
		    permissions: data.status
		}
		var log = new LoginLog(param);
		log.save(function(err, res) {
			if (err) {
				console.log("Error:" + err);
			} else {
				console.log("Res:" + res);
			}
		});
	}

	/**
	 * @getClientIP
	 * @desc 获取用户 ip 地址
	 * @param {Object} req - 请求
	 */
	getClientIP(req) {
		return req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
			req.connection.remoteAddress || // 判断 connection 的远程 IP
			req.socket.remoteAddress || // 判断后端的 socket 的 IP
			req.connection.socket.remoteAddress;
	};
}
