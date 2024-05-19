export class App{
    constructor(canvas,ctx){
        this.canvas = canvas;
        this.ctx = ctx;
        this.multiplier = window.innerHeight / 1000;
        this.gridSize = 400 * this.multiplier;
        this.speed = 0;
        this.clients = {};
    }
    draw(){
        if(this.player)this.offsetX = -(this.player.x%this.gridSize);
        if(this.player)this.offsetY = -(this.player.y%this.gridSize);

        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.ctx.lineWidth = 0.2;
        this.ctx.strokeStyle = "black";
        for (let x = 0; x <= canvas.width; x += this.gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x + this.offsetX, 0);
            this.ctx.lineTo(x + this.offsetX, canvas.height);
            this.ctx.stroke();
            this.ctx.closePath();
        }

        // Disegna le linee orizzontali
        for (let y = 0; y <= this.canvas.height; y += this.gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0 + this.offsetY, y + this.offsetY);
            this.ctx.lineTo(this.canvas.width, y + this.offsetY);
            this.ctx.stroke();
            this.ctx.closePath();
        }

        for (const id in this.clients) {
            if(id !== this.player.ID){
                const client = this.clients[id];
                //const distance = Math.sqrt(Math.pow((Math.abs(app.player.x - client.x)),2) +  Math.pow((Math.abs(app.player.x - client.x)),2))
                const disX = this.player.x - client.x;
                const disY = this.player.y - client.y;
                this.ctx.beginPath();
                this.ctx.arc(this.canvas.width/2 - disX, this.canvas.height/2 - disY, client.size, 0, 2*Math.PI);
                this.ctx.fillStyle = "orange";
                this.ctx.fill();
                this.ctx.strokeStyle = "red"; // Imposta il colore del contorno
                this.ctx.lineWidth = 4; // Imposta la larghezza del contorno
                this.ctx.stroke(); // Disegna il contorno
                this.ctx.closePath();
                //console.log("Draw enemy at x: " + (this.canvas.width/2 + disX) + " y: " + (this.canvas.height/2 + disY))
            }
        }
        if(this.player) this.player.draw();
    }
}