const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const authRouter = require('./routes/auth');
const getDataRouter = require('./routes/get-data')
const userRouter = require('./routes/user');
const authenticate = require('./middleware/authenticate');

const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));
app.use(cors({ origin: '*', credentials: true }));

// Serve up static React build files at root endpoint
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/api/auth', authRouter);
app.use('/api/get-data', getDataRouter);
app.use('/api/user', authenticate, userRouter);

app.get('/api', (req, res) => {
  res.status(200).json({ message: 'STATUS: OK' });
});

module.exports = app;
