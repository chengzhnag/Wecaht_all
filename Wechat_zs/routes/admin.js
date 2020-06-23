var express = require('express');
var router = express.Router();
const Customers = require('../controller/customer/customer.js');
const LoginLogs = require('../controller/loginLog/loginLog.js');
const OperationLogs = require('../controller/operationLog/operationLog.js');
const Users = require('../controller/user/user.js');
const upload = require('../utils/upload.js');
const {
	check
} = require('express-validator');

router.post('/login', Users.login);

router.post('/addCustomer', [
	check('customerName').notEmpty(),
	check('customerMobil').notEmpty(),
	check('customerAdress').notEmpty(),
	check('hydraulicName').notEmpty(),
	check('hydraulicMobil').notEmpty(),
	check('qualityAssuranceNum').notEmpty(),
	check('hydraulicIntegral').notEmpty(),
	check('createrId').notEmpty(),
	check('uploadPhotos').isArray()
], Customers.addCustomer);

router.post('/upload', upload.single('myfile'), Customers.upload);

router.post('/anyupload', upload.array('myfile', 10), Customers.anyupload);

router.get('/getLoginLog', LoginLogs.getLoginLog);

router.get('/getOwnerList', Customers.getOwnerList);

router.post('/deleteOwner', Customers.deleteOwner);

router.post('/updateOwner', [
	check('customerName').notEmpty(),
	check('customerMobil').notEmpty(),
	check('customerAdress').notEmpty(),
	check('hydraulicName').notEmpty(),
	check('hydraulicMobil').notEmpty(),
	check('qualityAssuranceNum').notEmpty(),
	check('hydraulicIntegral').notEmpty(),
	check('createrId').notEmpty(),
	check('_id').notEmpty(),
	check('uploadPhotos').isArray()
], Customers.updateOwner);

router.get('/getOperationLog', OperationLogs.getOperationLog);

router.get('/getUserListByAdmin', Users.getUserListByAdmin);

router.get('/getCustomerByMobile', Customers.getCustomerByMobile);

router.get('/getWaitAuditList', Users.getWaitAuditList);

router.post('/auditUserByAdmin', Users.auditUserByAdmin);

module.exports = router;
