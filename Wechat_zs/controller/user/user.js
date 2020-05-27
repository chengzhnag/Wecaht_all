'use strict';

const User = require('../../models/user/user.js');
const BaseComponent = require('../../utils/baseComponent.js');
var url = require('url');
var utils = require('../../utils/wechatUtil.js');

class Users extends BaseComponent {
	constructor() {
		super()
	}
	getToken(req, res, next) {
		var params = url.parse(req.url, true).query;
		if (!params.code) {
			return super.returnErrMessage(res, '缺少参数: code');
		}
		utils.getAuthAccessToken(params.code).then(resp => {
			res.status(200).json({
				Code: 1,
				Message: 'Success',
				Data: resp
			})
		}).catch(err => {
			return super.returnErrMessage(res, '获取token发生错误', err.errmsg);
		})
	}
	async getUserInfo(req, res, next) {
		var params = url.parse(req.url, true).query;
		if (!params.openid) {
			return super.returnErrMessage(res, '缺少参数: openid');
		}
		try {
			const info = await User.findOne({
				'openId': params.openid
			}, '-__v -password');
			if (!info) {
				return super.returnErrMessage(res, '该用户不存在');
			} else {
				res.send({
					Code: 1,
					Message: '获取用户信息成功',
					Data: info
				})
			}
		} catch (err) {
			console.log(err);
			return super.returnErrMessage(res, '获取用户信息失败', err);
		}
	}
	async saveUser(req, res, next) {
		var body = req.body;
		if (!body.openId || !body.mobile) {
			return super.returnErrMessage(res, `缺少参数: ${!body.openId ? 'openId' : ''} ${!body.mobile ? ', mobile ' : ''}`);
		}
		try {
			var _filter = {
				$or: [ // 多字段同时匹配
					{
						mobile: {
							$regex: body.mobile
						}
					},
					{
						openId: {
							$regex: body.openId
						}
					}
				]
			}
			const info = await User.findOne(_filter);
			if (!info) {
				body.createTime = super.localDate();
				body.updateTime = super.localDate();
				const newUser = new User(body);
				await newUser.save();
				res.send({
					Code: 1,
					Message: '注册成功'
				})
			} else {
				return super.returnErrMessage(res, '当前用户已存在, 请不要重复注册');
			}
		} catch (err) {
			console.log(err);
			return super.returnErrMessage(res, '注册失败', err);
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
						return super.returnErrMessage(res, 'findOneAndUpdate 出错了', e);
					} else {
						res.send({
							Code: 1,
							Message: '更新成功',
							Data: super.deletePassword(writeResult)
						})
					}
				});
		} catch (err) {
			return super.returnErrMessage(res, '出错了', err);
		}
	}
	async login(req, res, next) {
		var body = req.body;
		var reg = 11 && /^((1)[1-9]{1}[0-9]{1}\d{8})$/;
		if (!body.mobile) {
			return super.returnErrMessage(res, '缺少参数: mobile');
		}
		if (!reg.test(body.mobile)) {
			return super.returnErrMessage(res, '手机号码格式不正确');
		}
		try {
			const info = await User.findOne({
				mobile: body.mobile
			}, '-__v -password');
			if (!info) {
				return super.returnErrMessage(res, '该手机号未注册, 请先去注册');
			} else {
				if (body.password != info.password) {
					return super.returnErrMessage(res, '密码错误, 请输入正确的密码');
				}
				res.send({
					Code: 1,
					Message: '登录成功',
					Data: info
				})
			}
		} catch (err) {
			console.log(err);
			return super.returnErrMessage(res, '登录出错', err);
		}
	}
}

module.exports = new Users();
