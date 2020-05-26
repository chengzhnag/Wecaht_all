'use strict';

const User = require('../../models/user/user.js');
const dtime = require('time-formater');
const BaseComponent = require('../../utils/baseComponent.js');

class Users extends BaseComponent {
	constructor() {
		super()
	}
	getUserInfo(id) {
		return new Promise((resolve, reject) => {
			try {
				User.findOne({
					'openId': id
				}, (err, data) => {
					if (data) {
						let _data = JSON.parse(JSON.stringify(data));
						delete _data.password
						resolve(_data);
					} else {
						reject(err || '');
					}
				});
			} catch (err) {
				reject(err);
			}
		})
	}
	saveUser(req, res, next) {
		var body = req.body;
		try {
			User.findOne({
				mobile: body.mobile,
				openId: body.openId
			}, (err, data) => {
				if (err) {
					return res.send({
						Code: 0,
						Message: '查询用户失败',
						Data: err
					})
				}
				if (data) {
					return res.send({
						Code: 0,
						Message: '该用户已存在, 请勿重复注册',
						Data: super.deletePassword(data)
					})
				}

				body.createTime = super.localDate();
				body.updateTime = super.localDate();
				new User(body).save((error, datas) => {
					if (error) {
						return res.send({
							Code: 0,
							Message: '注册失败',
							Data: error
						})
					}
					return res.send({
						Code: 1,
						Message: '注册成功',
						Data: super.deletePassword(datas)
					})
				})
			})
		} catch (err) {
			res.send({
				Code: 0,
				Message: '出错了',
				Data: err
			})
		}
	}
	upDateUser(req, res, next) {
		var body = req.body;
		try {
			const query = {
				_id: body._id
			};
			delete body._id;
			const options = {
				upsert: true,
				new: true
			};
			body.updateTime = super.localDate();
			User.findOneAndUpdate(query,
				body,
				options,
				(e, writeResult) => {
					if (e) {
						res.send({
							Code: 0,
							Message: 'findOneAndUpdate 出错了',
							Data: e
						})
					} else {
						res.send({
							Code: 1,
							Message: '更新成功',
							Data: super.deletePassword(writeResult)
						})
					}
				});
		} catch (err) {
			res.send({
				Code: 0,
				Message: '出错了',
				Data: err
			})
		}
	}
	login(req, res, next) {
		var body = req.body;
		var reg = 11 && /^((1)[1-9]{1}[0-9]{1}\d{8})$/;
		if (reg.test(body.mobile)) {
			User.findOne({
				mobile: body.mobile
			}, (err, data) => {
				if (err) {
					return super.returnErrMessage(res, '查询用户失败', err);
				}
				if(body.password != data.password) {
					return super.returnErrMessage(res, '密码错误, 请输入正确的密码');
				}
				res.send({
					Code: 1,
					Message: '登录成功',
					Data: super.deletePassword(data)
				})
			})
		} else {
			return super.returnErrMessage(res, '手机号码格式不正确');
		}
	}
}

module.exports = new Users();
