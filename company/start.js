var express = require("express");
var app     = express();
var path    = require("path");
var mongojs = require('mongojs');
// var passport = require('passport');
//var bodyParser = require('body-parser');

var databaseUrl = 'project';
var collections = ['employee'];
var db = mongojs(databaseUrl, collections);
module.exports = {
    connect: db
};

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});


app.post('/index.html',function(req, res){
  console.log(req.body.user);
  // db.employee.findOne({"user":req.body.user}, function(err, data) {
  //   console.log(data);
  //   if(data!=null && (req.body.pass == data.pass)){
  //     // data_user = data;
  //     res.sendFile(path.join(__dirname+'/home.html'));
  //   }else{
  //     res.sendFile(path.join(__dirname+'/index.html'));
  //   }
  // });
  });




app.listen(3000);
console.log("Running at Port 3000");
