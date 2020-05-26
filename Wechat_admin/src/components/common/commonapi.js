// const host = 'http://justdb.top:8080/';
const host = 'http://192.168.0.149:9000/';

const commonapi = {
	hostUrl: host,
	login: host + 'admin/login',
	upload: host + 'admin/upload',
	userregister: host + 'admin/userregister',
	loginLog: host + 'admin/loginlog',
	getuserlist: host + 'admin/getuserlist',
	deleteuser: host + 'admin/deleteuser',
	updateuser: host + 'admin/updateuser',
	operationLog: host + 'admin/operationlog',
}
export {
	commonapi
}