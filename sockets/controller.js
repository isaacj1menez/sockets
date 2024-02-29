

const socketController = (socket) => {

    socket.on('send-message', (payload, callback) => {
        const id = 123456;
        callback(id);
        socket.broadcast.emit('forward', payload);
    });
}

module.exports = {
    socketController
}