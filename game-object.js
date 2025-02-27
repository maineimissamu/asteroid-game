class GameObject {
    constructor(id, x, y, elementType = 'div', className = '') {
        this.id = id;
        this.x = x;
        this.y = y;
        this.element = document.createElement(elementType);
        this.element.id = id;
        if(className) {
            this.element.className = className;
        }
        this.element.style.position = 'absolute';

        document.getElementById('game-screen').appendChild(this.element);
    }

    updatePosition() {
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
    }

    remove() {
        this.element.remove();
    }

    distanceTo(otherObject) {
        const dx = this.x - otherObject.x;
        const dy = this.y - otherObject.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    isColliding(otherObject, collisionRadius) {
        return this.distanceTo(otherObject) < collisionRadius;
    }
}