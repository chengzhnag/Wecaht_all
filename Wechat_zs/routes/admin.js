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
	check('uploadPhotos').isArray()
], Customers.updateOwner);

router.get('/getOperationLog', OperationLogs.getOperationLog);

module.exports = router;
