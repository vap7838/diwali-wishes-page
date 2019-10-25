var express = require('express');
var app = express();
var router = express.Router();

//call user database model

var usermodel = require('../schema/user_table');

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('create', { title: 'Express' });
});


router.post('/create', function(req, res, next) {
  console.log(req.body);
  // create array 

  const mybodydata = {
    user_name : req.body.username,
    mobile_number:req.body.contact  
  }

  console.log(mybodydata);

  // create model object 
  var data = usermodel(mybodydata);

  // store data in database!

  data.save(function(err,inserted_data){
    if(err){
      console.log(err + "Error in Insert Record");
    }else{
      console.log(inserted_data+ "hi this vishal patel");
      var id = inserted_data._id;
      app.set('id',id);
      res.redirect('/display');
    }
  })

});

// display route

router.get('/display', function(req, res, next) {
  console.log(app.get('id')+"vishal is you get this id");
  // var url = req.protocol+'://'+req.get('host')+req.originalUrl+'/'+app.get('id');
  // console.log(url + "i get the url");
  usermodel.findById(app.get('id'),function(err, db_user_array){
    if(err){
      console.log(err+ "error in display data !");
    }else{
      console.log(db_user_array+"vishal you get the selected data");
      
      res.render('display',{user_array:db_user_array});
    }
  })
});

router.get('/display/:id', function(req, res, next) {
  console.log(req.params.id);
  usermodel.findById(req.params.id,function(err, db_user_array){
    if(err){
      console.log(err+ "error in display data !");
    }else{
      console.log(db_user_array+"vishal you get the selected data");
      
      res.render('diwali',{user_array:db_user_array});
    }
  })
});

module.exports = router;
