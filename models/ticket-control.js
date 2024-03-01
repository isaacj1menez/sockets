const fs = require('fs');
const path = require('path');


class Ticket {
    constructor(number, desktop) {
        this.number = number;
        this.desktop = null;
    }
}

class TicketControl {

    constructor() {
        this.last = 0;
        this.date = new Date().getDate();
        this.tickets = [];
        this.lastFour = [];

        this.init();
    }

    get toJson(){
        return {
            last: this.last,
            date: this.date,
            tickets: this.tickets,
            lastFour: this.lastFour
        }
    }

    init () {
        const { last, date, tickets, lastFour  } = require('../db/db.json');
        if(date === this.date) {
            this.last = last;
            this.tickets = tickets;
            this.lastFour =  lastFour;
        } else {
            this.saveDb();
        }
    }

    saveDb() {
        const filePath = path.join(__dirname, "../db/db.json");
        fs.writeFileSync(filePath, JSON.stringify(this.toJson));
    }

    next() {
        this.last += 1;
        const ticket = new Ticket(this.last);
        this.tickets.push(ticket);
        return 'Ticket ' + ticket.number;
    }

    attendTicket(desktop) {
        if(this.tickets.length ===0) {
            return null;
        }

        const ticket = this.tickets.shift();
        ticket.desktop = desktop;

        const count = this.lastFour.unshift(ticket);
        if(count > 4) {
            this.lastFour.splice(-1, 1);
        }

        this.saveDb();

        return ticket;
    }
}

module.exports = TicketControl;