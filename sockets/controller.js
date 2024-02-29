const socketController = (socket) => {
    socket.on('send-message', (payload, callback) => {
        const id = socket.id;
        callback(id);
        socket.broadcast.emit('forward', payload);
    });
}


module.exports = {
    socketController
}