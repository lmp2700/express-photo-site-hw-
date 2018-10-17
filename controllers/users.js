const express = require('express');
const router = express.Router();
const User = require('../models/usermodel');
const Photos = require('../models/photomodel');

// just get create, edit and delete for the HW

router.get('/', async (req, res) => {
  try {
    const foundUsers = await User.find();
    res.render('users/index.ejs', {
      users: foundUsers
    });
  } catch(err) {
    res.send(err)
    }
});

router.get('/new', async (req, res) => {
  try {
    const newUsers = await User.find();
    res.render('users/new.ejs', {
      user: newUsers
    });
    } catch(err) {
      res.send(err)
    }
  });

router.post('/', async (req, res) => {
    try {
      const createUser = await User.create(req.body);
      res.redirect('/users')
    } catch(err) {
      res.send(err)
    }
  });
  

router.get('/users', async (req, res) => {
  try {
    const allUsers = await User.find();
    res.render('users/users.ejs', {
      user: allUsers
    })
  } catch(err) {
    res.send(err)
  }
});

// There should be a show page for the user's photos. On this page, you should be able to see the user's username, 
// all pictures that this particular user has posted, and their photo information.
// There should also be a button to either edit or delete the user.
// 2-Model - Think about it: Is the user’s id a part of the route? In which case there would be two params for 
// one user’s particular photo. Would that look like users/1/8 or like photos/1/8?

router.get('/:id', async (req, res)=>{
  try {
    const findUser = await User.findById(req.params.id);
    // push the photos into an array?
    res.render('users/show.ejs', {
      user: findUser
    });
  } catch(err) {
    res.send(err)
  }
});

// If you click on button to edit a user, it should take you to an edit form.
// If you click on the delete button, the user should be deleted.
// 2-Model - Think about it: If we delete a user, we also need to delete their photos. 
// Will that automatically happen when we delete the user?
router.get('/:id/edit', async (req, res) => {
  try {
    const editUser = await User.findByIdAndUpdate(req.params.id);
    res.render('users/edit.ejs', {
      user: editUser
    });
  } catch(err) {
    res.send(err)
  }
});
  // User.findByIdAndUpdate(req.params.id, (err, editUser) => {
  //   res.render('users/edit.ejs', {
  //     user: editUser
  //   });
  // });




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

router.put('/:id', async (req, res) => {
  try {
    const updateUser = await User.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/users')
  } catch(err) {
    res.send(err)
  }
});
  // User.findByIdAndUpdate(req.params.id, req.body, (err, updateUser) => {
  //   res.redirect('/users');
  // })

router.delete('/:id', async (req, res) => {
  try {
    const deleteUser = await User.findOneAndDelete(req.params.id);
    res.render('/users/show.ejs')
  } catch(err) {
    res.send(err)
  }
});
  // User.findOneAndDelete(req.params.id, (err, deleteUser) => {
  //   res.render('users/show.ejs')
  // });

module.exports = router;