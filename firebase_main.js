const admin = require('firebase-admin');
const functions = require('firebase-functions');
const createApp = require('./app');
const DataStoreFactory = require('./src/datastore/datastorefactory');

const app = createApp(DataStoreFactory('local'));

exports.user = functions.https.onRequest(app);