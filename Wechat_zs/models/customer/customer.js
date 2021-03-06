'use strict';
const mongoose = require('mongoose')
// 表模型
const customerSchema = new mongoose.Schema({
	'customerName': {
		type: String,
		required: true
	},
	'customerMobil': {
		type: String,
		required: true
	},
	'customerAdress': {
		type: String,
		required: true
	},
	'hydraulicName': {
		type: String,
		required: true
	},
	'hydraulicMobil': {
		type: String,
		required: true
	},
	'qualityAssuranceNum': {
		type: String,
		required: true
	},
	'hydraulicIntegral': {
		type: String,
		required: true
	},
	'createrId': {
		type: String,
		required: true
	},
	'dealers': String,
	'createTime': {
		type: Date,
		default: Date.now
	},
	'operatingAccount': String,
	'uploadPhotos': Array
})
module.exports = mongoose.model('Customer', customerSchema)
