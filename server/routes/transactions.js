var express = require('express');
var router = express.Router();

var transactionctrl = require('../controllers/transactionctrl')

router.get('/', transactionctrl.get)

router.post('/', transactionctrl.create)

router.get('/:id', transactionctrl.getOne)

router.put('/:id', transactionctrl.update)

router.delete('/:id', transactionctrl.remove)

module.exports = router;