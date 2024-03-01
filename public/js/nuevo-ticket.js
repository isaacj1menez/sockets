const lblNuevoTicket = document.querySelector("#lblNuevoTicket");
const btnNew = document.querySelector('button');

const socket = io();

socket.on('connect', () => {
    btnNew.disabled = false;
});

socket.on('disconnect', () => {
    btnNew.disabled = true;
});

socket.on('last-ticket', (last) => {
    lblNuevoTicket.innerHTML = 'Ticket ' + last;
});


btnNew.addEventListener('click', () => {
    socket.emit('next-ticket', null, (last) => {
        lblNuevoTicket.innerHTML = last;
    });
});