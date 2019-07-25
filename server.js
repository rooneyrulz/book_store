import express from 'express';
import { createServer } from 'http';
import mongoose from 'mongoose';
import logger from 'morgan';
import path from 'path';

// Import DB Connection
import dbConnect from './config/db';

// Import routes
import indexRoute from './routes/api';
import bookRoute from './routes/api/book';
import authRoute from './routes/auth/auth';
import userRoute from './routes/auth/user';
import downloadRoute from './routes/api/download-csv';

const app = express();
const server = createServer(app);

// Set port
app.set('port', process.env.PORT || 3000);

// Use mongoose promise library
mongoose.Promise = require('bluebird');

// Connecting to mongoDB
dbConnect(server, app.get('port'));

// Use http logger middleware
app.use(logger('dev'));

// Using express middleware functions for parsing json body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Handling CORS Errors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-auth-token'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, GET, DELETE');
    return res.status(200).json({});
  }
  next();
});

// Use routes
app.use('/api/test', indexRoute);
app.use('/api', bookRoute);
app.use('/api/download-csv', downloadRoute);
app.use('/users', userRoute);
app.use('/user/auth', authRoute);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
