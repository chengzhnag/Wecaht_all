var express = require('express');
var router = express.Router();
const Customers = require('../controller/customer/customer.js');
const Users = require('../controller/user/user.js');
const upload = require('../utils/upload.js');

router.post('/login', Users.login);

router.post('/addCustomer', Customers.addCustomer);

router.post('/upload', upload.single('myfile'), Customers.upload);

module.exports = router;