'use strict';

const User = require('../../models/user/user.js');
const BaseComponent = require('../../utils/baseComponent.js');
var url = require('url');
var utils = require('../../utils/wechatUtil.js');
var _this;

class Users extends BaseComponent {
	constructor() {
		super()
		_this = this;
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
			return super.returnErrMessage(res, '获取用户信息失败', err.message);
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
			return super.returnErrMessage(res, '注册失败', err.message);
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
			return super.returnErrMessage(res, '出错了', err.message);
		}
	}

	async getUserList(req, res, next) {
		// 查询条件变成正则
		var findval = new RegExp(req.query.keyword); //查询的时候判断条件加 new RegExp( )即可变成关键字搜索
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
			if (info.status == 2) { // 如果不是管理员
				return super.returnErrMessage(res, '没有权限调用该接口, 请联系管理员');
			}
			let params = {
				$or: [{
					nickname: findval
				}, {
					mobile: findval
				}]
			};
			const data = await User.find(params);
			if (data) {
				res.send({
					Code: 1,
					Message: '获取用户列表数据成功',
					Data: data
				})
			} else {
				return super.returnErrMessage(res, '获取用户列表数据失败');
			}
		} catch (err) {
			return super.returnErrMessage(res, '获取用户数据列表失败', err.message);
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
			}, '-__v');
			if (!info) {
				return super.returnErrMessage(res, '该手机号未注册, 请先去注册');
			} else {
				if (body.password != info.password) {
					return super.returnErrMessage(res, '密码错误, 请输入正确的密码');
				}
				super.insertLoginLog(info, req);
				res.send({
					Code: 1,
					Message: '登录成功',
					Data: info
				})
			}
		} catch (err) {
			console.log(err);
			return super.returnErrMessage(res, '登录出错', err.message);
		}
	}

	async setAdmin(req, res, next) {
		var body = req.body;
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
			if (info.status == 2) { // 如果不是管理员
				return super.returnErrMessage(res, '没有权限调用该接口, 请联系管理员');
			}
			var ids = body.ids.split(',');
			for (let i = 0; i < ids.length; i++) {
				await _this.funcSetAdmin(ids[i], info, req);
			}
			res.send({
				Code: 1,
				Message: '设置管理员成功'
			})
		} catch (err) {
			return super.returnErrMessage(res, '设置管理员出错了', err.message);
		}
	}

	async funcSetAdmin(id, u_data, req) {
		try {
			// 通过_id查找当前操作的用户数据
			const info = await User.findOne({
				'_id': id
			});
			if (info) {
				const query = {
					_id: id
				};
				const options = {
					upsert: true,
					new: true
				};
				await User.findOneAndUpdate(query, {
						status: 1
					},
					options)
				super.insertOperationLog(u_data, info, 'setadmin', req);
			}
		} catch (e) {
			console.log(e.message);
		}
	}

	async getUserListByAdmin(req, res, next) {
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
					nickname: findval
				}, {
					mobile: findval
				}]
			};
			// 获取数据库所有用户的长度
			var count = await await User.countDocuments(params);
			const data = await User.find(params)
				.skip((parseInt(pageNum, 10) - 1) * parseInt(pageSize, 10))
				.limit(parseInt(pageSize, 10))
				.sort({
					'_id': -1
				});
			if (data) {
				res.send({
					Code: 1,
					Message: '获取全部用户数据成功',
					TotalCount: count,
					Data: data
				})
			} else {
				return super.returnErrMessage(res, '获取全部用户数据失败');
			}
		} catch (err) {
			return super.returnErrMessage(res, '获取全部用户数据失败', err.message);
		}
	}
}

module.exports = new Users();
