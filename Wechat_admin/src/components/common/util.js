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
	}
}

export default util;
