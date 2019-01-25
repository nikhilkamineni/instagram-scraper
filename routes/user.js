const express = require('express');

const User = require('../models/user.js');

const userRouter = express.Router();

userRouter.get('/get-user', async (req, res) => {
  try {
    const username = req.user.username; // passed on from authenticate middleware
    const user = await User.findOne({ username }).lean();
    delete user.password;
    res.status(200).json(user);
  } catch (error) {
    const message = 'Internal Server Error!';
    console.error(`${message}\n${error}`);
    res.status(500).json({ message, error });
  }
});

userRouter.post('/save-page', async (req, res) => {
  try {
    const handle = req.body.handle;
    const username = req.user.username // passed on from authenticate middleware

    const conditions = {
      username,
      'pages.handle': { $ne: handle }
    };

    const newPage = {
      $push: { pages: { handle } }
    };

    const options = { new: true };

    const savedPage = await User.findOneAndUpdate(conditions, newPage, options).lean();
    delete savedPage.password;
    if (!savedPage)
      return res.status(400).json({ message: 'Page already exists!' });
    else return res.status(201).json(savedPage);
  } catch (error) {
    const message = 'Error saving a new page';
    console.error(`${message}\n${error}`);
    return res.status(500).json({ message, error });
  }
});

userRouter.put('/delete-page', async (req, res) => {
  try {
    const pageId = req.body.pageId;
    const username = req.user.username;
    const pageToRemove = {
      $pull: {
        pages: {
          _id: pageId
        }
      }
    };

    const options = { new: true };

    const updatedUser = await User.findOneAndUpdate(
      { username },
      pageToRemove,
      options
    ).lean();

    delete updatedUser.password;

    res
      .status(200)
      .json({ message: 'Page was successfully deleted!', updatedUser });
  } catch (error) {
    const message = 'Error deleting a new page';
    console.error(`${message}\n${error}`);
    res.status(500).json({ message, error });
  }
});

module.exports = userRouter;
