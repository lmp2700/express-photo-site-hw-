const express = require('express');
const router = express.Router();
const User = require('../models/usermodel');


router.get('/', (req, res) => {
    User.find({}, (err, foundUsers) => {
        res.render('../users/index.ejs', {
            users: foundUsers
        });
    });
});

router.get('/new', (req, res) => {
    res.render('users/new.ejs');
  })
  
  router.get('/:id', (req, res)=>{
    User.findById(req.params.id, (err, foundUser)=>{
      res.render('users/show.ejs', {
        users: foundUser
      });
    });
  });


module.exports = router;