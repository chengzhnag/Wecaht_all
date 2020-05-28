'use strict';

const OperationLog = require('../../models/operationLog/operationLog.js');
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
		try {
			const count = await OperationLog.estimatedDocumentCount();
			const data = await OperationLog.find({})
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
			return super.returnErrMessage(res, '获取操作日志失败', err);
		}
	}
}

module.exports = new OperationLogs();
