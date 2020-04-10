'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
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
	}
})

module.exports = mongoose.model('User', userSchema);