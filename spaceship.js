
class Spaceship extends GameObject {
    constructor() {
        super('spaceship', 400, 300);
        
  
        this.shipBody = document.createElement('div');
        this.shipBody.className = 'ship-body';
        this.element.appendChild(this.shipBody);
        

        this.shipMarker = document.createElement('div');
        this.shipMarker.className = 'ship-marker';
        this.element.appendChild(this.shipMarker);
        

        this.angle = 0;
        this.width = 30;
        this.height = 30;
        this.speed = 0;
        this.maxSpeed = 5;
        

        this.updatePosition();
    }
    

    rotate(direction) {
        this.angle += direction * 5;
        this.element.style.transform = `rotate(${this.angle}deg)`;
    }
    

    thrust() {
        const radians = this.angle * Math.PI / 180;
        const thrustX = Math.sin(radians);
        const thrustY = -Math.cos(radians);
        
 
        this.x += thrustX * 2;
        this.y += thrustY * 2;
        
   
        if (this.x < 0) this.x = 800;
        if (this.x > 800) this.x = 0;
        if (this.y < 0) this.y = 600;
        if (this.y > 600) this.y = 0;
        
        this.updatePosition();
    }

    updatePosition() {
        this.element.style.left = `${this.x - 15}px`;
        this.element.style.top = `${this.y - 15}px`;
    }
    

    shoot(projectileId) {
        const radians = this.angle * Math.PI / 180;
        const directionX = Math.sin(radians);
        const directionY = -Math.cos(radians);
        

        const tipX = this.x + (directionX * 15);
        const tipY = this.y + (directionY * 15);
        

        return new Projectile(
            `projectile-${projectileId}`,
            tipX,
            tipY,
            directionX,
            directionY
        );
    }
    

    reset() {
        this.x = 400;
        this.y = 300;
        this.angle = 0;
        this.speed = 0;
        this.updatePosition();
        this.element.style.transform = `rotate(${this.angle}deg)`;
    }
}