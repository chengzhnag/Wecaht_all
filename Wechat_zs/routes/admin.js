var express = require('express');
var router = express.Router();
// const Customers = require('../controller/customers/customer.js');
const Users = require('../controller/user/user.js');

router.post('/login', Users.login);

// router.post('/updateUser', Users.upDateUser);

module.exports = router;