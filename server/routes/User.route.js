const express = require('express');
const bcrypt = require('bcrypt');
const jwt  = require('jsonwebtoken')
const User = require('../models/User.model');
const Userrouter = express.Router();


Userrouter.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(200).json({ error: 'User already exists' });
    }
    // Hashing the user password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    const newUser = await User.create({ email, password: hashedPassword });
    res.status(200).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});
Userrouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      // Check if the user exists
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      // Compare passwords
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      // Generate a JWT token
      const token = jwt.sign({ userId: user.id }, 'yogi');
      res.json({ token });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ error: 'Failed to login' });
    }
  });
module.exports = Userrouter;
