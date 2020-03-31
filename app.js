const express = require('express');
const createRouter = require('./src/router');

function createApp(datastore) {
    app = express();
    app.use(express.json());
    app.use('/', createRouter(datastore.userStore));
    return app;
}

module.exports = createApp;