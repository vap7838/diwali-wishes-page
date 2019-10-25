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

  data.save(function(err){
    if(err){
      console.log(err + "Error in Insert Record");
    }else{
      res.redirect('/display');
    }
  })

});

// display route

router.get('/display', function(req, res, next) {
  
  usermodel.find(function(err, db_user_array){
    if(err){
      console.log(err+ "error in display data !");
    }else{
      console.log(db_user_array+"vishal you get the selected data");
      
      res.render('display',{user_array:db_user_array});
    }
  }).sort({_id:-1}).limit(1);
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
