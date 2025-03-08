class Projectile extends GameObject {
    constructor(id, x, y, directionX, directionY) {
        super(id, x, y, 'div', 'projectile');

        this.directionX = directionX;
        this.directionY = directionY;
        this.speed = 10;
        this.element.style.width = '4px';
        this.element.style.height = '12px';
        this.element.style.backgroundColor = '#64ffda';
        this.element.style.boxShadow = '0 0 8px 2px #64ffda';
        this.element.style.borderRadius = '2px';
        
        const angle = Math.atan2(directionY, directionX) * (180 / Math.PI) + 90;
        this.element.style.transform = `rotate(${angle}deg)`;

        this.updatePosition();
    }

    update() {
        this.x += this.directionX * this.speed;
        this.y += this.directionY * this.speed;
        this.updatePosition();

        if(this.x < 0 || this.x > 800 || this.y < 0 || this.y > 600) {
            return false;
        }
        return true;
    }

    updatePosition() {
        this.element.style.left = `${this.x - 2}px`;
        this.element.style.top = `${this.y - 6}px`;
    }
}