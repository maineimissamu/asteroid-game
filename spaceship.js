/**
 * Spaceship class - player controlled ship
 */
class Spaceship extends GameObject {
    constructor() {
        super('spaceship', 400, 300);
        
        // Create spaceship body (triangle)
        this.shipBody = document.createElement('div');
        this.shipBody.className = 'ship-body';
        this.element.appendChild(this.shipBody);
        
        // Create front marker
        this.shipMarker = document.createElement('div');
        this.shipMarker.className = 'ship-marker';
        this.element.appendChild(this.shipMarker);
        
        // Spaceship properties
        this.angle = 0;
        this.width = 30;
        this.height = 30;
        this.speed = 0;
        this.maxSpeed = 5;
        
        // Adjust initial position to account for ship size
        this.updatePosition();
    }
    
    /**
     * Rotate the spaceship
     */
    rotate(direction) {
        this.angle += direction * 5;
        this.element.style.transform = `rotate(${this.angle}deg)`;
    }
    
    /**
     * Move spaceship forward in the direction it's facing
     */
    thrust() {
        const radians = this.angle * Math.PI / 180;
        const thrustX = Math.sin(radians);
        const thrustY = -Math.cos(radians);
        
        // Update position
        this.x += thrustX * 2;
        this.y += thrustY * 2;
        
        // Screen wrapping
        if (this.x < 0) this.x = 800;
        if (this.x > 800) this.x = 0;
        if (this.y < 0) this.y = 600;
        if (this.y > 600) this.y = 0;
        
        this.updatePosition();
    }
    
    /**
     * Override update position to account for spaceship size/shape
     */
    updatePosition() {
        this.element.style.left = `${this.x - 15}px`;
        this.element.style.top = `${this.y - 15}px`;
    }
    
    /**
     * Fire a projectile from the front of the ship
     */
    shoot(projectileId) {
        const radians = this.angle * Math.PI / 180;
        const directionX = Math.sin(radians);
        const directionY = -Math.cos(radians);
        
        // Calculate the position of the ship's tip
        const tipX = this.x + (directionX * 15);
        const tipY = this.y + (directionY * 15);
        
        // Create projectile at the ship's tip
        return new Projectile(
            `projectile-${projectileId}`,
            tipX,
            tipY,
            directionX,
            directionY
        );
    }
    
    /**
     * Reset the spaceship to starting position
     */
    reset() {
        this.x = 400;
        this.y = 300;
        this.angle = 0;
        this.speed = 0;
        this.updatePosition();
        this.element.style.transform = `rotate(${this.angle}deg)`;
    }
}