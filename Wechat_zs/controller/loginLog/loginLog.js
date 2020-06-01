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
		// 获取header的id
		var _id = req.headers.zsid;
		if (!_id) return super.returnErrMessage(res, '请传入用户id进行请求');
		try {
			// 通过_id查找当前操作的用户数据
			const info = await User.findOne({
				'_id': _id
			});
			if (!info) {
				return super.returnErrMessage(res, '无法查找到该用户');
			}
			// 获取数据库所有登录日志的长度
			var count = await LoginLog.estimatedDocumentCount();
			if (info.status == 2) { // 如果不是管理员
				// 获取createrId等于_id的日志长度
				count = await LoginLog.countDocuments({
					createrId: _id
				});
			}
			let params = {};
			// 如果是管理员查找所有的登录日志, 否则查找自己的登录日志
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
