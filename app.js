const express = require('express');
const createRouter = require('./src/router');
const cors = require('cors');

function createApp(datastore) {
    app = express();
    app.use(cors({origin: true}));
    app.use(express.json());
    app.use('/', createRouter(datastore.userStore));
    return app;
}

module.exports = createApp;
