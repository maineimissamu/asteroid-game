class Projectile extends GameObject {
    constructor(id, x, y, directionX, directionY) {
        super(id, x, y, 'div', 'projectile');

        this.directionX = directionX;
        this.directionY = directionY;
        this.speed = 10;

        this.element.style.width = '5px';
        this.element.style.height = '10px';
        this.element.style.backgroudColor = 'white';

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
        this.element.style.left = `${this.x - 2.5}px`;
        this.element.style.top = `${this.y - 5}px`;
    }
}