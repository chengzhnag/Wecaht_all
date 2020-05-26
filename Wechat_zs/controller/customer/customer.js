'use strict';

const Customer = require('../../models/customer/customer.js');
const dtime = require('time-formater');
const BaseComponent = require('../../utils/baseComponent.js');

class Customers extends BaseComponent {
	constructor() {
		super()
	}
	
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
}

module.exports = new Customers();