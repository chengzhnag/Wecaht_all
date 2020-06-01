import md5 from 'blueimp-md5'
const util = {
	passwrodMd5(pd) {
		pd = "zs-" + pd;
		return md5(md5(pd));
	},
	/**
	 * @description 验证手机号码
	 * @param {*} rule, value, callback 
	 */
	validMobile(rule, value, callback) {
		var reg = 11 && /^((1)[1-9]{1}[0-9]{1}\d{8})$/;
		if (value == '') {
			callback(new Error('请输入手机号'));
		} else if (!reg.test(value)) {
			callback(new Error('手机号格式不正确'));
		}
		callback();
	},
	/**
	 * Parse the time to string
	 * @param {(Object|string|number)} time
	 * @param {string} cFormat
	 * @returns {string | null}
	 */
	parseTime(time, cFormat) {
		if (arguments.length === 0) {
			return null
		}
		if (!time) {
			time = new Date();
		}
		const format = cFormat || '{y}-{m}-{d} {h}:{i}'
		let date
		if (typeof time === 'object') {
			date = time
		} else {
			time = time.replace(/T/g, ' ');
			if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
				time = parseInt(time)
			}
			if ((typeof time === 'number') && (time.toString().length === 10)) {
				time = time * 1000
			}
			date = new Date(time)
		}
		const formatObj = {
			y: date.getFullYear(),
			m: date.getMonth() + 1,
			d: date.getDate(),
			h: date.getHours(),
			i: date.getMinutes(),
			s: date.getSeconds(),
			a: date.getDay()
		}
		const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
			const value = formatObj[key]
			// Note: getDay() returns 0 on Sunday
			if (key === 'a') {
				return ['日', '一', '二', '三', '四', '五', '六'][value]
			}
			return value.toString().padStart(2, '0')
		})
		return time_str
	}
}

export default util;
