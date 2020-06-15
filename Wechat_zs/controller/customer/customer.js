'use strict';

const Customer = require('../../models/customer/customer.js');
const User = require('../../models/user/user.js');
// const dtime = require('time-formater');
const BaseComponent = require('../../utils/baseComponent.js');
const {
	validationResult
} = require('express-validator');


class Customers extends BaseComponent {
	constructor() {
		super()
	}
	async addCustomer(req, res, next) {
		// express-validator中间件验证参数
		const errors = validationResult(req);
		console.log(errors);
		if (!errors.isEmpty()) {
			return res.status(422).json({
				errors: errors.array()
			});
		}
		// 获取header的id
		var _id = req.headers.zsid;
		if (!_id) return super.returnErrMessage(res, '请传入用户id进行请求');
		var body = req.body;
		try {
			// 通过_id查找当前操作的用户数据
			const u_data = await User.findOne({
				'_id': _id
			});
			if (!u_data) {
				return super.returnErrMessage(res, '无法查找到该用户');
			}
			// 通过请求传入的手机号查询是否存在该业主
			const info = await Customer.findOne({
				customerMobil: body.customerMobil
			}, '-_id -__v -password');
			if (!info) { // 不存在则添加业主
				const newCus = new Customer(body);
				await newCus.save();
				// 插入一条操作日志
				super.insertOperationLog(u_data, body, 'add', req);
				res.send({
					Code: 1,
					Message: '添加成功'
				})
			} else {
				return super.returnErrMessage(res, '当前业主已存在, 请不要重复添加');
			}
		} catch (err) {
			return super.returnErrMessage(res, '添加业主失败', err.message);
		}
	}
	upload(req, res, next) {
		if (!req.file) {
			return super.returnErrMessage(res, '上传文件失败');
		}
		req.file.path = _config.uploadUrl + _config.uploadDir + req.file.filename;
		res.send({
			Code: 1,
			Message: '上传成功',
			Data: req.file
		})
	}
	async getOwnerList(req, res, next) {
		// 查询条件变成正则
		var findval = new RegExp(req.query.keyword); //查询的时候判断条件加 new RegExp( )即可变成关键字搜索
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
			let params = {
				$or: [{
					customerName: findval
				}, {
					hydraulicName: findval
				}, {
					customerAdress: findval
				}, {
					customerMobil: findval
				}, {
					hydraulicMobil: findval
				}, {
					dealers: findval
				}]
			};
			// 如果是管理员查找所有的业主, 否则查找自己创建的业主
			info.status == 1 ? '' : params.createrId = _id;
			// 获取数据库所有业主的长度
			var count = await Customer.countDocuments(params);
			const data = await Customer.find(params)
				.skip((parseInt(pageNum, 10) - 1) * parseInt(pageSize, 10))
				.limit(parseInt(pageSize, 10))
				.sort({
					'_id': -1
				});
			if (data) {
				res.send({
					Code: 1,
					Message: '获取业主数据成功',
					TotalCount: count,
					Data: data
				})
			} else {
				return super.returnErrMessage(res, '获取业主数据失败');
			}
		} catch (err) {
			return super.returnErrMessage(res, '获取业主数据失败', err.message);
		}
	}

	async deleteOwner(req, res, next) {
		// 获取header的id
		var _id = req.headers.zsid;
		if (!_id) return super.returnErrMessage(res, '请传入用户id进行请求');
		var body = req.body;
		try {
			// 通过_id查找当前操作的用户数据
			const u_data = await User.findOne({
				'_id': _id
			});
			if (!u_data) {
				return super.returnErrMessage(res, '无法查找到该用户');
			}
			// 通过传入的id查找数据库是否存在要删除的业主
			const info = await Customer.findOne({
				_id: body._id
			})
			if (!info) {
				return super.returnErrMessage(res, '查询不到该业主, 无法删除');
			}
			// 如果当前操作的用户不是管理员 && info['createrId'] 不是当前操作用户的id
			// 管理员可以删除任何人, 非管理员只能删除自己添加的业主
			if (u_data['status'] == 2 && info['createrId'] != u_data['_id']) {
				return super.returnErrMessage(res, '无法删除他人添加的业主, 删除失败');
			}
			await Customer.remove({
				_id: body._id
			});
			// 插入一条操作日志
			super.insertOperationLog(u_data, info, 'delete', req);
			res.send({
				Code: 1,
				Message: '删除成功'
			})
		} catch (err) {
			return super.returnErrMessage(res, '删除业主失败', err.message);
		}
	}
	async updateOwner(req, res, next) {
		// express-validator中间件验证参数
		const errors = validationResult(req);
		console.log(errors);
		if (!errors.isEmpty()) {
			return res.status(422).json({
				errors: errors.array()
			});
		}
		// 获取header的id
		var _id = req.headers.zsid;
		if (!_id) return super.returnErrMessage(res, '请传入用户id进行请求');
		var body = req.body;
		try {
			// 通过_id查找当前操作的用户数据
			const u_data = await User.findOne({
				'_id': _id
			});
			if (!u_data) {
				return super.returnErrMessage(res, '无法查找到该用户');
			}
			// 通过id更新整条记录
			await Customer.update({
				_id: body._id
			}, body);
			// 插入一条操作日志
			super.insertOperationLog(u_data, body, 'update', req);
			res.send({
				Code: 1,
				Message: '更新成功'
			})
		} catch (err) {
			console.log(err);
			return super.returnErrMessage(res, '更新业主数据失败', err.message);
		}
	}

	async getCustomerByMobile(req, res, next) {
		const mobile = req.query.mobile || '';
		if (!mobile) return super.returnErrMessage(res, '缺少参数 mobile');
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
			const data = await Customer.findOne({
				'customerMobil': mobile
			}, '-__v -_id');
			if (data) {
				res.send({
					Code: 1,
					Message: '获取业主数据成功',
					Data: data
				})
			} else {
				return super.returnErrMessage(res, '无法查找到该业主');
			}
		} catch (err) {
			return super.returnErrMessage(res, '获取业主数据失败', err.message);
		}
	}
}

module.exports = new Customers();
