import mongoose from 'mongoose';
import Promise from 'bluebird';

import seed from './seed/seed';

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/food_db');

// seed();
console.log('hello world!!!!!'); //eslint-disable-line
