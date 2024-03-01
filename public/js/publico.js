const lblTicket1 = document.querySelector('#lblTicket1');
const lblEscritorio1 = document.querySelector('#lblEscritorio1');

const lblTicket2 = document.querySelector('#lblTicket2');
const lblEscritorio2 = document.querySelector('#lblEscritorio2');

const lblTicket3 = document.querySelector('#lblTicket3');
const lblEscritorio3 = document.querySelector('#lblEscritorio3');

const lblTicket4 = document.querySelector('#lblTicket4');
const lblEscritorio4 = document.querySelector('#lblEscritorio4');

const socket = io();

socket.on('last-four', (tickets) => {
    const [ ticket1, ticket2, ticket3, ticket4 ] = tickets;
    
    lblTicket1.innerHTML = 'Attending ticket ' + ticket1.number;
    lblEscritorio1.innerHTML = ticket1.desktop;

    lblTicket2.innerHTML = 'Attending ticket ' + ticket2.number;
    lblEscritorio2.innerHTML = ticket2.desktop;

    lblTicket3.innerHTML = 'Attending ticket ' + ticket3.number;
    lblEscritorio3.innerHTML = ticket3.desktop;

    lblTicket4.innerHTML = 'Attending ticket ' + ticket4.number;
    lblEscritorio4.innerHTML = ticket4.desktop;
});