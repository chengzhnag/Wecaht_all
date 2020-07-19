const LoginLog = require('../models/loginLog/loginLog.js');
const OperationLog = require('../models/operationLog/operationLog.js');
const dtime = require('time-formater');
const fs = require('fs');
const path = require('path');

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

	localDate() {
		return dtime().format('YYYY-MM-DD HH:mm');
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
			createrId: data._id,
			landTime: _this.localDate(),
			landIp: _this.getClientIP(req),
			permissions: data.status
		}
		var log = new LoginLog(param);
		log.save(function (err, res) {
			if (err) {
				console.log("Error:" + err);
			} else {
				console.log("Res:" + res);
			}
		});
	}

	// 插入操作日志记录
	insertOperationLog(u_data, info, type, req) {
		let conf = {
			'update': '更新了一个业主',
			'updateuser': '更新了一个用户',
			'add': '添加了一个业主',
			'delete': '删除了一个业主',
			'setadmin': '设置了一个管理员',
			'deleteuser': '删除了一个用户'
		}
		let param = {
			userName: u_data.nickname,
			createrId: u_data._id,
			landTime: _this.localDate(),
			landIp: _this.getClientIP(req),
			operationText: u_data.nickname + conf[type] + (info.customerName || info.nickname),
			permissions: u_data.status
		}

		var log = new OperationLog(param);
		log.save(function (err, res) {
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
	}

	// 删除文件
	deleteall(files = []) { // 删除path目录下所有文件包括本身
		try {
			let _path = _config.uploadPath;
			if (fs.existsSync(_path) && files) {
				files.forEach((item) => {
					var curPath = _path + "/" + item['filename'];
					fs.unlinkSync(curPath);
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
}
