class Asteroid extends GameObject {
    constructor(id, x, y, directionX, directionY, speed) {
        super(id, x, y, 'div', 'asteroid');

        this.directionX = directionX;
        this.directionY = directionY;
        this.speed = speed;
        this.radius = 15;
        this.rotation = 0;
        this.rotationSpeed = (Math.random() - 0.5) * 2; 

 
        const size = 30 + Math.floor(Math.random() * 10);
        this.element.style.width = `${size}px`;
        this.element.style.height = `${size}px`;
        
  
        const asteroidType = Math.floor(Math.random() * 3);
        
        switch(asteroidType) {
            case 0:
                this.element.style.backgroundImage = "radial-gradient(circle, #8B4513 30%, #654321 70%, #3b2717 100%)";
                this.element.style.borderRadius = "50%";
                break;
            case 1:
                this.element.style.backgroundImage = "radial-gradient(circle, #888888 30%, #555555 70%, #333333 100%)";
                this.element.style.borderRadius = "30% 70% 40% 60% / 60% 30% 70% 40%";
                break;
            case 2:
                this.element.style.backgroundImage = "radial-gradient(circle, #a05a2c 30%, #774231 70%, #523629 100%)";
                this.element.style.borderRadius = "60% 40% 30% 70% / 40% 60% 70% 30%";
                break;
        }
        

        this.element.style.boxShadow = "inset 2px 2px 5px rgba(255, 255, 255, 0.2), inset -2px -2px 5px rgba(0, 0, 0, 0.8)";
        
        this.updatePosition();
    }

    update() {
        this.x += this.directionX * this.speed;
        this.y += this.directionY * this.speed;


        this.rotation += this.rotationSpeed;
        this.element.style.transform = `rotate(${this.rotation}deg)`;

        if(this.x < -30) this.x = 830;
        if(this.x > 830) this.x = -30;
        if(this.y < -30) this.y = 630;
        if(this.y > 630) this.y = -30;

        this.updatePosition();
    }

    updatePosition() {
        this.element.style.left = `${this.x - parseFloat(this.element.style.width) / 2}px`;
        this.element.style.top = `${this.y - parseFloat(this.element.style.height) / 2}px`;
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