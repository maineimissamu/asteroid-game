class MiniBoss extends GameObject {
    constructor(id, x, y) {
        super(id, x, y, 'div', 'mini-boss');
        
        this.health = 2;
        this.projectileCount = 0;
        this.projectiles = [];
        this.shootInterval = null;
        this.radius = 15; 
        this.element.style.width = '30px';
        this.element.style.height = '30px';
        this.element.style.backgroundImage = "url('assets/ovni.png')";
        this.element.style.backgroundSize = '100% 100%';
        this.element.style.borderRadius = '50%';
        this.element.style.border = '2px solid #99ccff';
        this.element.style.boxShadow = '0 0 12px #3366ff';
        this.healthIndicator = document.createElement('div');
        this.healthIndicator.className = 'boss-health';
        this.healthIndicator.textContent = this.health;
        this.healthIndicator.style.position = 'absolute';
        this.healthIndicator.style.top = '50%';
        this.healthIndicator.style.left = '50%';
        this.healthIndicator.style.transform = 'translate(-50%, -50%)';
        this.healthIndicator.style.color = 'white';
        this.healthIndicator.style.fontWeight = 'bold';
        this.healthIndicator.style.fontSize = '12px';
        this.element.appendChild(this.healthIndicator);
        this.updatePosition();
        this.startShooting();
    }
    
    updatePosition() {
        this.element.style.left = `${this.x - 15}px`;
        this.element.style.top = `${this.y - 15}px`;
    }
    
    startShooting() {
        this.shootInterval = setInterval(() => this.shootAtPlayer(), 3000); 
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
            `mini-boss-projectile-${this.projectileCount++}`,
            this.x,
            this.y,
            normalizedDirX,
            normalizedDirY
        );
        
        this.projectiles.push(projectile);
        
        if (window.game) {
            window.game.bossProjectiles.push(projectile);
            window.game.soundManager.play('projectile');
        }
    }
    
    hit() {
        this.health--;
        this.healthIndicator.textContent = this.health;
        this.element.style.filter = "brightness(1.5)";
        setTimeout(() => {
            if (this.health > 0) {
                this.element.style.filter = "brightness(1)";
            }
        }, 200);
        
        if (this.health <= 0) {
            return false; 
        }
        return true; 
    }
    
    update() {
        this.x += (Math.random() - 0.5) * 2;
        this.y += (Math.random() - 0.5) * 2;
        
        if (this.x < 30) this.x = 30;
        if (this.x > 770) this.x = 770;
        if (this.y < 30) this.y = 30;
        if (this.y > 570) this.y = 570;
        
        this.updatePosition();
        
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
        
        this.element.style.filter = "brightness(1.5)";
        this.element.style.boxShadow = '0 0 15px #99ccff';
        
        setTimeout(() => {
            super.remove();
        }, 300);
    }
    
    static createRandom() {
        const x = 100 + Math.random() * 600;
        const y = 100 + Math.random() * 400;
        
        return new MiniBoss(`mini-boss-${Date.now()}`, x, y);
    }
}