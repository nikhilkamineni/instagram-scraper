const express = require('express');
const { User, Page } = require('./UserModel');

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    const message = 'Error getting User with that ID';
    console.error(`${message}\n${error}`);
    res.status(500).json({ message, error });
  }
});
