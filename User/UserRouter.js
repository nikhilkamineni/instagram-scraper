const express = require('express');
const User = require('./UserModel');

const userRouter = express.Router();

userRouter.get('/getUser', async (req, res) => {
  try {
    const username = req.user.username; // passed on from authenticate middleware
    const user = await User.findOne({ username });
    res.status(200).json(user);
  } catch (error) {
    const message = 'Internal Server Error!';
    console.error(`${message}\n${error}`);
    res.status(500).json({ message, error });
  }
})

userRouter.post('/savePage', async (req, res) => {
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

    const savedPage = await User.findOneAndUpdate(conditions, newPage, options);
    if (!savedPage)
      return res.status(400).json({ message: 'Page already exists!' });
    else return res.status(201).json(savedPage);
  } catch (error) {
    const message = 'Error saving a new page';
    console.error(`${message}\n${error}`);
    return res.status(500).json({ message, error });
  }
});

userRouter.put('/deletePage', async (req, res) => {
  try {
    const { userId, pageId } = req.body;
    const pageToRemove = {
      $pull: {
        pages: {
          _id: pageId
        }
      }
    };
    const options = { new: true };
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      pageToRemove,
      options
    );
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
