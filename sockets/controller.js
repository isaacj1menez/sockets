const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {

    socket.emit('last-ticket', ticketControl.last);
    socket.emit('last-four', ticketControl.lastFour);
    socket.emit('queue', ticketControl.tickets.length);

    socket.on('next-ticket', (payload, callback) => {
        const next = ticketControl.next();
        ticketControl.saveDb();
        callback(next);
    });

    socket.on('attend', ({ desktop }, callback)=> {
        if(!desktop) {
            callback({
                ok: false,
                message: 'No desktop provided'
            })
        }
        
        const ticket = ticketControl.attendTicket(desktop);
        socket.broadcast.emit('last-four', ticketControl.lastFour);

        if(!ticket) {
            callback({
                ok: false,
                message: 'No more tickets to attend'
            });
        } else {
            callback({
                ok: true,
                ticket
            });
        }

        socket.broadcast.emit('queue', ticketControl.tickets.length);
    });

}


module.exports = {
    socketController
}