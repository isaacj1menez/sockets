const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMessage = document.querySelector('#txtMessage');
const btnSend = document.querySelector('#btnSend');

const socket = io();

socket.on('connect', () => {

    lblOnline.style.display = ''
    lblOffline.style.display = 'none'
});

socket.on('disconnect', () => {
    
    lblOffline.style.display = ''
    lblOnline.style.display = 'none'
    
});

socket.on('forward', (payload) => {
    console.log(payload);
});

btnSend.addEventListener('click', () => {
    const message = txtMessage.value;
    const payload = {
        message,
        id: '123ABC',
        date: new Date().getTime()

    }
    socket.emit('send-message', payload, (id) => {
        console.log(id);
    });
});