import express from 'express';
import { createServer } from 'http';
import mongoose from 'mongoose';
import config from 'config';
import logger from 'morgan';
import path from 'path';

// Import routes
import indexRoute from './routes/api';
import bookRoute from './routes/api/book';
import authRoute from './routes/auth/auth';
import userRoute from './routes/auth/user';
import downloadRoute from './routes/api/download-csv';

// Import MongoURI
const mongoURI = config.get('MONGO_URI');

const app = express();
const server = createServer(app);

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

// Set static folder
app.use('/public', express.static(path.resolve(__dirname, 'public')));

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

// Set port
app.set('port', process.env.PORT || 3000);

// Use mongoose promise library
mongoose.Promise = require('bluebird');

// Connecting to mongodb
async function init() {
  try {
    const isConnected = await mongoose.connect(mongoURI, {
      auth: {
        user: 'user-name',
        password: 'user-password',
      },
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    if (isConnected) {
      // Listening to server
      await server.listen(app.get('port'), () =>
        console.log(`server running on port ${app.get('port')}...`)
      );
      console.log(`connecting to mongodb...`);
    }
  } catch (error) {
    // process.exit(1);
    console.log(error.message);
  }
}

init();
