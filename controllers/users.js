const express = require('express');
const router = express.Router();
const User = require('../models/usermodel');
const Photos = require('../models/photomodel');

// just get create, edit and delete for the HW

router.get('/', (req, res) => {
    User.find({}, (err, foundUsers) => {
        res.render('users/index.ejs', {
            users: foundUsers
        });
    })
});


router.get('/new', (req, res) => {
    res.render('users/new.ejs');
  })

router.get('/users', (req, res) => {
  User.find({}, (err, allUsers) => {
    res.render('users/users.ejs', {
      user: allUsers
    });
  });
});

// There should be a show page for the user's photos. On this page, you should be able to see the user's username, 
// all pictures that this particular user has posted, and their photo information.
// There should also be a button to either edit or delete the user.
// 2-Model - Think about it: Is the user’s id a part of the route? In which case there would be two params for 
// one user’s particular photo. Would that look like users/1/8 or like photos/1/8?

router.get('/:id', (req, res)=>{
  User.findById(req.params.id, (err, foundUser) => {
    // push the photos into the array for the user
    res.render('users/show.ejs', {
      user: foundUser,
      photos: Photos
    });
  });
});

// If you click on button to edit a user, it should take you to an edit form.
// If you click on the delete button, the user should be deleted.
// 2-Model - Think about it: If we delete a user, we also need to delete their photos. 
// Will that automatically happen when we delete the user?
router.get('/:id/edit', (req, res) => {
  User.findByIdAndUpdate(req.params.id, (err, editUser) => {
    res.render('users/edit.ejs', {
      user: editUser
    });
  });
});


router.post('/', (req, res) => {
  User.create(req.body, (err, createdUser) => {
    if(err) {
      console.log(err)
    } else {
      console.log(createdUser)
      res.redirect('/users')
      }
  });
});

// CODE FOR PUSHING PHOTOS TO THE PAGE??
// router.post("/:id", (req, res) => {
//   User.findById(req.params.id, (err, foundData)=> {
//       Photos.create(req.body, (err, newPhoto) => {
//           foundData.photos.push(newPhoto);
//           foundData.save((err,saved) => {
//               res.redirect("/");
//           });
//       });
//   });
// });

router.put('/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, (err, updateUser) => {
    res.redirect('/users');
  })
})

router.delete('/:id', (req, res) => {
  User.findOneAndDelete(req.params.id, (err, deleteUser) => {
    res.render('users/show.ejs')
  });
});












module.exports = router;