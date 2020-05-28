'use strict';

const Customer = require('../../models/customer/customer.js');
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
}

module.exports = new Customers();
