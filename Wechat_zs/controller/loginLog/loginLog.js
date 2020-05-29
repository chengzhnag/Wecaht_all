'use strict';

const LoginLog = require('../../models/loginLog/loginLog.js');
const User = require('../../models/user/user.js');
// const dtime = require('time-formater');
const BaseComponent = require('../../utils/baseComponent.js');


class LoginLogs extends BaseComponent {
	constructor() {
		super()
	}
	async getLoginLog(req, res, next) {
		const {
			pageNum = 1, pageSize = 10
		} = req.query;
		var _id = req.headers.zsid;
		if (!_id) return super.returnErrMessage(res, '请传入用户id进行请求');
		try {
			const info = await User.findOne({
				'_id': _id
			});
			const count = await LoginLog.estimatedDocumentCount();
			let params = {};
			info.status == 1 ? '' : params.createrId = _id;
			const data = await LoginLog.find(params)
				.skip((parseInt(pageNum, 10) - 1) * parseInt(pageSize, 10))
				.limit(parseInt(pageSize, 10))
				.sort({
					'_id': -1
				});
			if (data) {
				res.send({
					Code: 1,
					Message: '获取登录日志数据成功',
					TotalCount: count,
					Data: data
				})
			} else {
				return super.returnErrMessage(res, '暂无登录日志数据');
			}
		} catch (err) {
			return super.returnErrMessage(res, '获取登录日志失败', err);
		}
	}
}

module.exports = new LoginLogs();
