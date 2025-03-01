class Boss extends GameObject {
    constructor(id, x, y) {
        super(id, x, y, 'div', 'boss');
        
        
        this.health = 6;
        this.projectileCount = 0;
        this.projectiles = [];
        this.shootInterval = null;
        this.radius = 25; 
        
        
        this.element.style.width = '50px';
        this.element.style.height = '50px';
        this.element.style.backgroundColor = '#ff3300';
        this.element.style.borderRadius = '50%';
        this.element.style.border = '2px solid #ffcc00';
        
        
        this.healthIndicator = document.createElement('div');
        this.healthIndicator.className = 'boss-health';
        this.healthIndicator.textContent = this.health;
        this.healthIndicator.style.position = 'absolute';
        this.healthIndicator.style.top = '50%';
        this.healthIndicator.style.left = '50%';
        this.healthIndicator.style.transform = 'translate(-50%, -50%)';
        this.healthIndicator.style.color = 'white';
        this.healthIndicator.style.fontWeight = 'bold';
        this.element.appendChild(this.healthIndicator);
        
        this.updatePosition();
        
       
        this.startShooting();
    }
    
    updatePosition() {
        this.element.style.left = `${this.x - 25}px`;
        this.element.style.top = `${this.y - 25}px`;
    }
    
    startShooting() {
        this.shootInterval = setInterval(() => this.shootAtPlayer(), 2000);
    }
    
    stopShooting() {
        clearInterval(this.shootInterval);
    }
    
    shootAtPlayer() {
        if (!window.game || !window.game.spaceship || !window.game.active) return;
        
        const targetX = window.game.spaceship.x;
        const targetY = window.game.spaceship.y;
        
        
        const directionX = targetX - this.x;
        const directionY = targetY - this.y;
        
        
        const magnitude = Math.sqrt(directionX * directionX + directionY * directionY);
        const normalizedDirX = directionX / magnitude;
        const normalizedDirY = directionY / magnitude;
        
        
        const projectile = new BossProjectile(
            `boss-projectile-${this.projectileCount++}`,
            this.x,
            this.y,
            normalizedDirX,
            normalizedDirY
        );
        
        this.projectiles.push(projectile);
        
        if (window.game) {
            window.game.bossProjectiles.push(projectile);
        }
    }
    
    hit() {
        this.health--;
        this.healthIndicator.textContent = this.health;
        
        
        this.element.style.backgroundColor = '#ff9900';
        setTimeout(() => {
            if (this.health > 0) {
                this.element.style.backgroundColor = '#ff3300';
            }
        }, 200);
        
        if (this.health <= 0) {
            return false; 
        }
        return true; 
    }
    
    update() {
        
        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            if (!this.projectiles[i].update()) {
                this.projectiles[i].remove();
                this.projectiles.splice(i, 1);
            }
        }
    }
    
    remove() {
        this.stopShooting();
        
        
        this.projectiles.forEach(projectile => projectile.remove());
        
        
        this.element.style.backgroundColor = '#ffff00';
        this.element.style.boxShadow = '0 0 30px #ffff00';
        
        setTimeout(() => {
            super.remove();
        }, 300);
    }
    
    static createRandom() {
        
        const margin = 150; 
        
        
        let x, y;
        do {
            x = margin + Math.random() * (800 - 2 * margin);
            y = margin + Math.random() * (600 - 2 * margin);
        } while (
            Math.abs(x - 400) < 100 && 
            Math.abs(y - 300) < 100
        );
        
        return new Boss('boss', x, y);
    }
}

class BossProjectile extends GameObject {
    constructor(id, x, y, directionX, directionY) {
        super(id, x, y, 'div', 'boss-projectile');
        
        this.directionX = directionX;
        this.directionY = directionY;
        this.speed = 5;
        
        this.element.style.width = '8px';
        this.element.style.height = '8px';
        this.element.style.backgroundColor = '#ff9900';
        this.element.style.borderRadius = '50%';
        
        this.updatePosition();
    }
    
    update() {
        this.x += this.directionX * this.speed;
        this.y += this.directionY * this.speed;
        
        this.updatePosition();
        
       
        if (this.x < 0 || this.x > 800 || this.y < 0 || this.y > 600) {
            return false;
        }
        return true;
    }
    
    updatePosition() {
        this.element.style.left = `${this.x - 4}px`;
        this.element.style.top = `${this.y - 4}px`;
    }
}