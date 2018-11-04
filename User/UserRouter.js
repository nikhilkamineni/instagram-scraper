const express = require('express');
const User = require('./UserModel');

const userRouter = express.Router();

userRouter.get('/:id', async (req, res) => {
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

userRouter.post('/saveUser', async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    const message = 'Error saving new user';
    console.error(`${message}\n${error}`);
    res.status(500).json({ message, error });
  }
});

userRouter.post('/savePage', async (req, res) => {
  try {
    const { id, handle } = req.body;
    const newPage = {
      $push: {
        pages: { handle }
      }
    };
    const options = { new: true };
    const savedPage = await User.findByIdAndUpdate(id, newPage, options);
    res.status(201).json(savedPage);
  } catch (error) {
    const message = 'Error saving a new page';
    console.error(`${message}\n${error}`);
    res.status(500).json({ message, error });
  }
});

userRouter.put('/deletePage', async (req, res) => {
  try {
    const { userId, pageId } = req.body
    const pageToRemove = {
      $pull: {
        pages: {
          _id: pageId
        }
      }
    };
    const options = { new: true };
    const updatedUser = await User.findByIdAndUpdate(userId, pageToRemove, options);
    res.status(200).json({message: 'Page was successfully deleted!', updatedUser});
  } catch (error) {
    const message = 'Error deleting a new page'
    console.error(`${message}\n${error}`);
    res.status(500).json({ message, error });
  }
})

module.exports = userRouter;
