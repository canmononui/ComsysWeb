var express = require('express');
var app     = express();
var path    = require('path');
var mongojs = require('mongojs');
// var passport = require('passport');
var bodyParser = require('body-parser');
var util = require('util');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

var databaseUrl = 'project';
var collections = ['employee','last','time'];
var db = mongojs(databaseUrl, collections);
var num,date,type,note;
var count=5;
var value="";
module.exports = {
    connect: db
};
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//ไม่มี url ต่อท้าย เรียกใช้หน้า index_jade
app.get('/', function (req, res) {
	console.log("get /");
  res.render('index_jade');
});
//เรียกใช้หน้า home_jade
app.get('/home_jade', function (req, res) {
  db.employee.findOne({'user':num},function(err, currentUsers) {
  db.time.findOne({'user':num},function(err, day) {
  res.render('home_jade',{currentUsers:currentUsers, showday:day});
});
});
});
//เรียกใช้หน้า index_jade
app.get('/index_jade', function (req, res) {
  res.render('index_jade');
});

//เรียกใช้หน้า last_jade
app.get('/last_jade', function (req, res) {
  db.employee.findOne({'user':num},function(err, currentUsers) {
  db.last.findOne({'user':num},function(err, day) {
  res.render('last_jade',{currentUsers:currentUsers, showlast:day});
});
});
});

//เรียกใช้หน้า report_jade
app.get('/report_jade', function (req, res) {
  db.employee.findOne({'user':num},function(err, currentUsers) {
  res.render('report_jade',{currentUsers:currentUsers});
});
});

//กดปุ่ม login
app.post('/index_jade',function(req, res){
  db.employee.findOne({'user':req.body.user}, function(err, data) {
    if(data!=null && (req.body.pass == data.pass)){
      res.redirect('/home_jade'); //แสดงหน้า home
      num = data.user;
      console.log(num);
      // res.render (body.id = data.id);
    }else{
      res.redirect('/index_jade');
    }
});
});
//กดปุ่ม logout
  app.post('/home_jade',function(req, res){
      res.redirect('/index_jade');
});

  app.post('/last_jade',function(req, res){
        res.redirect('/index_jade');
});

  app.post('/report_jade',function(req, res){
      date = req.body.date;
      type = req.body.type;
      note = req.body.note;
      //count = count+1;
      db.last.insert({
        'count6' : "6",
        'date6' : date,
        'type6' : type,
        'note6' : note});
      console.log(date,type,note);
        res.redirect('/report_jade');
});

app.listen(3000);
console.log("Running at Port 3000");
