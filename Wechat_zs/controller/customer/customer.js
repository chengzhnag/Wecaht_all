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
		const errors = validationResult(req);
		console.log(errors);
		if (!errors.isEmpty()) {
			return res.status(422).json({
				errors: errors.array()
			});
		}
		var body = req.body;
		try {
			const info = await Customer.findOne({
				customerMobil: body.customerMobil
			}, '-_id -__v -password');
			if (!info) {
				const newCus = new Customer(body);
				await newCus.save();
				res.send({
					Code: 1,
					Message: '添加成功'
				})
			} else {
				return super.returnErrMessage(res, '当前用户已存在, 请不要重复添加');
			}
		} catch (err) {
			return super.returnErrMessage(res, '添加用户失败', err);
		}
	}
	upload(req, res, next) {
		if (!req.file) {
			return super.returnErrMessage(res, '上传文件失败');
		}
		// req.file.path = req.file.path.replace(/^public/g, _config.uploadUrl);
		res.send({
			Code: 1,
			Message: '上传成功',
			Data: req.file
		})
	}
	async getOwnerList(req, res, next) {
		var findval = new RegExp(req.query.keyword); //查询的时候判断条件加 new RegExp( )即可变成关键字搜索
		const {
			pageNum = 1, pageSize = 10
		} = req.query;
		var _id = req.headers.zsid;
		if (!_id) return super.returnErrMessage(res, '请传入用户id进行请求');
		try {
			const info = await User.findOne({
				'_id': _id
			});
			const count = await Customer.estimatedDocumentCount();
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
			info.status == 1 ? '' : params.createrId = _id;
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
			return super.returnErrMessage(res, '获取业主数据失败', err);
		}
	}

	async deleteOwner(req, res, next) {
		var body = req.body;
		try {
			const info = await Customer.findOne({
				_id: body._id
			})
			if (!info) {
				return super.returnErrMessage(res, '查询不到该业主, 无法删除');
			}
			await Customer.remove({
				_id: body._id
			});
			res.send({
				Code: 1,
				Message: '删除成功'
			})
		} catch (err) {
			return super.returnErrMessage(res, '删除业主失败', err);
		}
	}
	async updateOwner(req, res, next) {
		const errors = validationResult(req);
		console.log(errors);
		if (!errors.isEmpty()) {
			return res.status(422).json({
				errors: errors.array()
			});
		}
		var body = req.body;
		try {
			const info = await Customer.findOne({
				_id: body._id
			})
			if (!info) {
				return super.returnErrMessage(res, '查询不到该业主, 无法更新数据');
			}
			Object.assign(info, body);
			await Customer.save(info);
			res.send({
				Code: 1,
				Message: '更新成功'
			})
		} catch (err) {
			return super.returnErrMessage(res, '更新业主数据失败', err);
		}
	}
}

module.exports = new Customers();
