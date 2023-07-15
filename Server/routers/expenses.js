const express = require('express');
const expenseControl = require('../controlers/expense')

const router = express.Router();



router.get('/getExpense/:userid', expenseControl.getSingleUser);
router.get('/getExpense', expenseControl.getAllExpense);



router.post('/addexpense', expenseControl.addExpense)

router.delete('/deleteuser/:userid', expenseControl.deleteUser)

router.put('/expensechange', expenseControl.editUser)


module.exports = router;