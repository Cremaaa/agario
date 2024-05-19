import { App } from "./models/app.js";
import { Player } from "./models/player.js";
const socket = io();

const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

let app = new App(canvas, ctx);

const loop = () => {
    app.draw();
    //requestAnimationFrame(loop);
}

loop();

socket.on('logged', (data) => {
    app.player = new Player(app, data.id, canvas, ctx, data.size, data.x, data.y);
});

let lastUpdate = 0;
socket.on("update", (clients) => {
    const now = performance.now();
    if (now - lastUpdate >= (1000 / 100)) { // 30 updates per second
        lastUpdate = now;

        const myData = clients[app.player.ID];
        app.player.x = myData.x;
        app.player.y = myData.y;
        app.clients = clients;
        loop();
    }
});


window.addEventListener("keydown", (e) => {
    if (e.key === "w") socket.emit("newDirection", { x: 0, y: -1 });
    if (e.key === "a") socket.emit("newDirection", { x: -1, y: 0 });
    if (e.key === "s") socket.emit("newDirection", { x: 0, y: 1 });
    if (e.key === "d") socket.emit("newDirection", { x: 1, y: 0 });
    if (e.key === " ") socket.emit("newDirection", { x: 0, y: 0 });
});

canvas.addEventListener("mousemove", (e) => {
    if (app.player) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        const dx = mouseX - centerX;
        const dy = mouseY - centerY;
        const magnitude = Math.sqrt(dx * dx + dy * dy);
        const direction = { x: dx / magnitude, y: dy / magnitude };
        socket.emit("newDirection", direction);
    }
});
