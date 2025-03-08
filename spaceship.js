class Spaceship extends GameObject {
    constructor() {
        super('spaceship', 400, 300);

        this.element.innerHTML = '';
        this.element.style.width = '40px';
        this.element.style.height = '40px';
        this.element.style.backgroundImage = "url('assets/spaceship.png')";
        this.element.style.backgroundSize = '100% 100%';
        this.thrusterElement = document.createElement('div');
        this.thrusterElement.className = 'thruster';
        this.thrusterElement.style.position = 'absolute';
        this.thrusterElement.style.width = '10px';
        this.thrusterElement.style.height = '15px';
        this.thrusterElement.style.backgroundColor = '#64ffda';
        this.thrusterElement.style.borderRadius = '50% 50% 0 0';
        this.thrusterElement.style.bottom = '-15px';
        this.thrusterElement.style.left = '15px';
        this.thrusterElement.style.transform = 'translateX(-50%)';
        this.thrusterElement.style.opacity = '0';
        this.thrusterElement.style.boxShadow = '0 0 10px #64ffda';
        this.thrusterElement.style.transition = 'opacity 0.1s ease-out';
        this.element.appendChild(this.thrusterElement);

        this.angle = 0;
        this.width = 40;
        this.height = 40;
        this.speed = 0;
        this.maxSpeed = 5;
        this.thrustActive = false; 
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
        this.thrusterElement.style.opacity = '1';
        clearTimeout(this.thrusterTimeout);
        this.thrusterTimeout = setTimeout(() => {
            this.thrusterElement.style.opacity = '0';
        }, 200);
        
        this.x += thrustX * 2;
        this.y += thrustY * 2;
        
        if (this.x < 0) this.x = 800;
        if (this.x > 800) this.x = 0;
        if (this.y < 0) this.y = 600;
        if (this.y > 600) this.y = 0;
        
        this.updatePosition();
    }

    updatePosition() {
        this.element.style.left = `${this.x - 20}px`;
        this.element.style.top = `${this.y - 20}px`;
    }

    shoot(projectileId) {
        const radians = this.angle * Math.PI / 180;
        const directionX = Math.sin(radians);
        const directionY = -Math.cos(radians); 
        const tipX = this.x + (directionX * 20);
        const tipY = this.y + (directionY * 20);
        const flash = document.createElement('div');
        flash.style.position = 'absolute';
        flash.style.width = '10px';
        flash.style.height = '10px';
        flash.style.backgroundColor = 'rgba(100, 255, 218, 0.8)';
        flash.style.borderRadius = '50%';
        flash.style.left = `${tipX - 5}px`;
        flash.style.top = `${tipY - 5}px`;
        flash.style.boxShadow = '0 0 10px #64ffda';
        flash.style.zIndex = '99';
        document.getElementById('game-screen').appendChild(flash);
        
        setTimeout(() => flash.remove(), 100);
        
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
        this.thrusterElement.style.opacity = '0';
    }
}