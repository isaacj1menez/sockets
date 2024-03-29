const express = require('express');
const cors = require('cors');
const { socketController } = require('../sockets/controller');

require('dotenv').config();

class Server {

    constructor() {
        this.app = express();
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);
        this.port = process.env.PORT;

        this.middlewares();

        this.sockets();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.static('public'));
    }

    sockets() {
        this.io.on('connection', socketController);        
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`App running in por ${ this.port }`)
        });
    }
}

module.exports = Server;