import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import Client from './models/client.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

const clients = {};

io.on('connection', (socket) => {
    clients[socket.id] = new Client(socket.id);
    socket.emit("logged", clients[socket.id]);

    socket.on('disconnect', () => {
        delete clients[socket.id];
    });

    socket.on("newDirection", (data) => {
        clients[socket.id].direction = data;
    });
});

let lastTime = Date.now();

const update = () => {
    const now = Date.now();
    const deltaTime = now - lastTime;
    lastTime = now;

    const updates = {};

    for (const id in clients) {
        const client = clients[id];
        client.x += client.direction.x * client.speed * (deltaTime); // Normalizza deltaTime a secondi
        client.y += client.direction.y * client.speed * (deltaTime);
        updates[id] = { x: client.x, y: client.y }; // Invia solo le coordinate aggiornate
    }

    io.sockets.emit('update', updates);
};

setInterval(update, 17); // Circa 60 FPS (1000ms / 60 ≈ 16.67ms)

server.listen(3000, () => {
    console.log('listening on port 3000');
});
