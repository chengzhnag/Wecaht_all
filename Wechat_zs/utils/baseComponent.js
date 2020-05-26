module.exports = class BaseComponent {
	constructor() {
		
	}

	copy(obj) {
		if (!obj) return obj;
		try {
			var result = JSON.parse(JSON.stringify(obj));
			return result;
		} catch (err) {
			console.log('copy err: ', err);
			return '';
		}
	}

	deletePassword(obj) {
		if (!obj) return obj;
		try {
			var result = JSON.parse(JSON.stringify(obj));
			delete result.password;
			return result;
		} catch (err) {
			console.log('deletePassword err: ', err);
			return '';
		}
	}

	localDate(v) {
		const d = new Date(v || Date.now());
		d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
		return d.toISOString();
	}
	
	returnErrMessage(res, msg, err) {
		return res.send({
			Code: 0,
			Message: msg,
			Data: err || '出现错误'
		})
	}
}