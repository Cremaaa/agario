export class Player{
    constructor(app, ID, canvas, ctx, size, x, y){
        this.app = app;
        this.ID = ID;
        this.canvas = canvas;
        this.ctx = ctx;
        this.size = size;
        this.x = x;
        this.y = y;
    }
    draw(){
        this.ctx.beginPath();
        this.ctx.arc(this.canvas.width/2, this.canvas.height/2, this.size, 0, 2*Math.PI);
        this.ctx.fillStyle = "orange";
        this.ctx.fill();
        this.ctx.strokeStyle = "red"; // Imposta il colore del contorno
        this.ctx.lineWidth = 4; // Imposta la larghezza del contorno
        this.ctx.stroke(); // Disegna il contorno
        this.ctx.closePath();
        this.ctx.fillText("X: "+this.x+" Y: "+this.y, 10,10)
        this.ctx.closePath();
    }
}