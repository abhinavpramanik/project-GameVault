const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
//dotenv
require('dotenv').config();
//for flash messages
const session = require('express-session'); 
const flash = require('connect-flash');

//routes
const indexRouter = require('./routes/indexRouter');
const ownersRouter = require('./routes/ownersRouter');
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');
const mongooseConnection = require('./config/mongoose-connection');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
// Session and Flash middleware
app.use(session({ secret: 'secretKey', resave: false, saveUninitialized: true }));
app.use(flash());

app.use('/', indexRouter);
app.use('/owners', ownersRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

// console.log(process.env.RAZORPAY_KEY_ID);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))