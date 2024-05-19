class Client{
    constructor(id){
        this.id = id;
        this.size = 20;
        this.x = Math.random() * 10000;
        this.y = Math.random() * 10000;
        this.speed = 0.2;
        this.direction = {x:0, y:0};
    }
}

export default Client;