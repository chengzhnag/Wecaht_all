'use strict';

const OperationLog = require('../../models/operationLog/operationLog.js');
const User = require('../../models/user/user.js');
// const dtime = require('time-formater');
const BaseComponent = require('../../utils/baseComponent.js');


class OperationLogs extends BaseComponent {
	constructor() {
		super()
	}
	async getOperationLog(req, res, next) {
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
			var count = await OperationLog.estimatedDocumentCount();
			if (info.status == 2) { // 如果不是管理员
				// 获取createrId等于_id的日志长度
				count = await OperationLog.countDocuments({
					createrId: _id
				});
			}
			let params = {};
			// 如果是管理员查找所有的操作日志, 否则查找自己的操作日志
			info.status == 1 ? '' : params.createrId = _id;
			const data = await OperationLog.find(params)
				.skip((parseInt(pageNum, 10) - 1) * parseInt(pageSize, 10))
				.limit(parseInt(pageSize, 10))
				.sort({
					'_id': -1
				});
			if (data) {
				res.send({
					Code: 1,
					Message: '获取操作日志数据成功',
					TotalCount: count,
					Data: data
				})
			} else {
				return super.returnErrMessage(res, '暂无操作日志数据');
			}
		} catch (err) {
			return super.returnErrMessage(res, '获取操作日志失败', err.message);
		}
	}
}

module.exports = new OperationLogs();
