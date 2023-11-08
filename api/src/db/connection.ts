import mongoose = require('mongoose');
import * as dotenv from 'dotenv';

dotenv.config();

const MONGO_URL = 'mongodb://127.0.0.1:27017/todo';

mongoose.Promise = global.Promise;

export const connect = () => {
  return mongoose.connect(MONGO_URL);
};