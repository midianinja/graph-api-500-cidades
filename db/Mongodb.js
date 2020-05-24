/* eslint-disable no-console */
import mongoose from 'mongoose';

import adresses from './schemas/adresses.model';
import users from './schemas/users.model';
import newsLetter from './schemas/newsLetter.model';


export default async ({ conn, mongoUrl = 'mongodb://localhost/500-cities' }) => {
  console.log('mongoUrl:', mongoUrl);
  try {
    if (!conn) {
      console.log('=> using new database connection');

      const newConnection = await mongoose.createConnection(mongoUrl, {
        bufferCommands: false,
        bufferMaxEntries: 0,
        keepAlive: true,
      });
      newConnection.model('adresses', adresses);
      newConnection.model('users', users);
      newConnection.model('news-letter', newsLetter);
      return newConnection;
    }
    console.log('=> using existing database connection');
    return conn;
  } catch (err) {
    console.error('err:', err);
    throw err;
  }
};
