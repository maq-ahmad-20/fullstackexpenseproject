const express = require('express');
const sequelize = require('./util/db')
const cors = require('cors');
const bodyParser = require('body-parser');
const expenseRouter = require('./routers/expenses')
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))




app.use(cors())

app.use(express.json())

// sequelize.sync()

app.use(expenseRouter)


app.listen(4000);