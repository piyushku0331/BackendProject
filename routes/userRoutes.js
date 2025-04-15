// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../db_models/User');  

// Display the list of users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();  
    res.render('user', { title: 'User List', users });  
  } catch (err) {
    res.status(500).send('Error retrieving users: ' + err);
  }
});

// POST route to add a new user
router.post('/add', async (req, res) => {
  const { name, email } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    const newUser = new User({
      name,
      email
    });

    await newUser.save();
    res.redirect('/users');  // Make sure this redirect matches the route
  } catch (err) {
    res.status(500).send('Error adding user: ' + err);
  }
});

// POST route to update user
router.post('/update/:email', async (req, res) => {
  const email = req.params.email;  
  const { name, newEmail } = req.body;  

  try {
    const user = await User.findOne({ email });  
    if (!user) {
      return res.status(404).send('User not found');
    }

    user.name = name || user.name;  
    user.email = newEmail || user.email; 
    await user.save();  

    res.redirect('/users');  
  } catch (err) {
    res.status(500).send('Error updating user: ' + err);
  }
});

// POST route to delete user
router.post('/delete/:email', async (req, res) => {
  const email = req.params.email;  
  try {
    const user = await User.findOneAndDelete({ email });  
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.redirect('/users');  
  } catch (err) {
    res.status(500).send('Error deleting user: ' + err);
  }
});

module.exports = router;
