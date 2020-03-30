const admin = require('firebase-admin');
const functions = require('firebase-functions');
const app = require('./app');

exports.user = functions.https.onRequest(app);