class Asteroid extends GameObject {
    constructor(id, x, y, directionX, directionY, speed) {
        super(id, x, y, 'div', 'asteroid');

        this.directionX = directionX;
        this.directionY = directionY;
        this.speed = speed;
        this.radius = 15;

        this.element.style.width = '30px';
        this.element.style.height = '30px';
        this.element.style.backgroundColor = '#8B4513';
        this.element.style.borderRadius = '50%';

        this.updatePosition();
       }

       update() {
       this.x += this.directionX * this.speed;
       this.y += this.directionY * this.speed;

       if(this.x < -30) this.x = 830;
       if(this.x > 830) this.x = -30;
       if(this.y < -30) this.y = 630;
       if(this.y > 630) this.y = -30;

       this.updatePosition();
       }

       updatePosition() {
        this.element.style.left = `${this.x - 15}px`;
        this.element.style.top = `${this.y - 15}px`;
    }

    static createRandom(id) {
        let x, y;
        if(Math.random() < 0.5) {
            x = Math.random() < 0.5 ? 0 : 800;
            y = Math.random() * 600;
        } else {
            x = Math.random() * 800;
            y = Math.random() < 0.5 ? 0 : 600;
        }

        const centerX = 400;
        const centerY = 300;
        let directionX = centerX - x;
        let directionY = centerY - y;

        directionX += (Math.random() - 0.5) * 200;
        directionY += (Math.random() - 0.5) * 200;

        const magnitude = Math.sqrt(directionX * directionX + directionY * directionY);
        directionX /= magnitude;
        directionY /= magnitude;

        const speed = 1 + Math.random() * 2;
        
        return new Asteroid(`asteroid-${id}`, x, y, directionX, directionY, speed);
    }
}