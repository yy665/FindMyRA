var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var usersInsert = require('./routes/insert');
var demonstrateRouter = require('./routes/demonstrate');
var deleteRouter = require('./routes/delete');
var updateRouter = require('./routes/update');
var queryRouter = require('./routes/query');
var userLogin = require('./routes/login');
var userRegister = require('./routes/registerUser');
var studentApply = require('./routes/studentApply');
var studentApplyDel = require('./routes/studentApplyDel');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//add
// app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/insert', usersInsert);
app.use('/demonstrate', demonstrateRouter);
app.use('/delete', deleteRouter);
app.use('/update', updateRouter);
app.use('/query', queryRouter);
app.use('/login', userLogin);
app.use('/registerUser', userRegister);
app.use('/studentApply', studentApply);
app.use('/studentApplyDel', studentApplyDel);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// app.get("/insert",function(req,res){
//   let myinsert = {
//     sql: "insert the number"
//   };
//   res.send(myinsert)
//   // console.log(req.body);
//   // console.log(req.body.name);
//   // console.log(req.body.age);
// });

const port = process.env.PORT || 3001
app.listen(port, ()=> {
  console.log(`server running @${port}`)
})


module.exports = app;
