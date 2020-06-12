'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	nickname: {
		type: String,
		required: true
	},
	openId: {
		type: String,
		required: true
	},
	mobile: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	createTime: {
		type: Date
	},
	updateTime: {
		type: Date,
		default: Date.now
	},
	avatar: {
		type: String,
		default: '/default-img/default_avatar.png'
	},
	gender: {
		type: Number,
		enum: [-1, 0, 1],
		default: -1
	},
	birthday: {
		type: Date,
		default: '1977-01-01'
	},
	status: {
		type: Number,
		// 权限 1最高管理员 2正常用户
		enum: [1, 2],
		default: 2
	}
})

module.exports = mongoose.model('User', userSchema);
