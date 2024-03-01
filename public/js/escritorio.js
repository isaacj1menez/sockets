const btnAttend = document.querySelector('button');
const lblDesktop = document.querySelector('h1');
const lblAttending = document.querySelector('small');
const lblWarning = document.querySelector('.alert');
const lblPendiente = document.querySelector('#lblPendientes');


const socket = io();

const searchParams = new URLSearchParams(window.location.search);

lblWarning.style.display = 'none';

if(!searchParams.has('escritorio')){
    window.location = 'index.html'
    throw new Error('Please provide a valid deskto');
}

const desktop = searchParams.get('escritorio');
lblDesktop.innerHTML = desktop;

socket.on('connect', () => {
    btnAttend.disabled = false;
});

socket.on('disconnect', () => {
    btnAttend.disabled = true;
});

socket.on('queue', (queue) => {
    lblPendiente.innerHTML = queue;
});

btnAttend.addEventListener('click', () => {
    socket.emit('attend', { desktop }, ({ ok, ticket }) => {
        if(!ok) {
            lblAttending.innerHTML = 'esperando...';
            return lblWarning.style.display = '';
        }

        lblAttending.innerHTML = 'Ticket ' + ticket.number;
    });
});