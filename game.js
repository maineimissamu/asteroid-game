class Game {
    constructor() {
        this.active = false;
        this.score = 0;
        this.keys = {};
        this.projectileCount = 0;
        this.asteroidCount = 0;
        this.projectiles = [];
        this.asteroids = [];

        this.splashScreen = document.getElementById('splash-screen');
        this.gameScreen = document.getElementById('game-screen');
        this.gameOverScreen = document.getElementById('game-over-screen');
        this.scoreDisplay = document.getElementById('score-display');
        this.finalScore = document.getElementById('final-score');

        this.spaceship = new Spaceship();

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.gameLoop = this.gameLoop.bind(this);

        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('keyup', this.handleKeyUp);
    }

    start() {
        this.active = true;
        this.score = 0;
        this.projectileCount = 0;
        this.asteroidCount = 0;

        this.projectiles.forEach(projectile => projectile.remove());
        this.asteroids.forEach(asteroid => asteroid.remove());
        this.projectiles = [];
        this.asteroids = [];

        this.spaceship.reset();

        this.splashScreen.style.display = 'none';
        this.gameOverScreen.style.display = 'none';
        this.gameScreen.style.display = 'flex';
        this.scoreDisplay.textContent = 'Score: 0';

        requestAnimationFrame(this.gameLoop);
        this.spawnAsteroid();
    }

    gameLoop() {
        if(!this.active) return;

        this.handleInput();
        this.updateProjectiles();
        this.updateAsteroids();
        this.checkCollisions();

        requestAnimationFrame(this.gameLoop);
    }

    handleInput() {
        if(this.keys['ArrowLeft']) {
            this.spaceship.rotate(-1);
        }
        if(this.keys['ArrowRight']) {
            this.spaceship.rotate(1);
        }

        if(this.keys['ArrowUp']) {
            this.spaceship.thrust();
        }

        if(this.keys[' '] && !this.keys['spaceCooldown']) {
            this.projectiles.push(this.spaceship.shoot(this.projectileCount++));
            this.keys['spaceCooldown'] = true;
            setTimeout(() => this.keys['spaceCooldown'] = false, 250);
        }
    }

    updateProjectiles() {
        for(let i = this.projectiles.length - 1; i >= 0; i--) {
            if(!this.projectiles[i].update()) {
                this.projectiles[i].remove();
                this.projectiles.splice(i, 1);
            }
        }
    }

    spawnAsteroid() {
        if(!this.active) return;

        this.asteroids.push(Asteroid.createRandom(this.asteroidCount++));

        setTimeout(() => this.spawnAsteroid(), 1000 + Math.random() * 1000);
    }

    updateAsteroids() {
        this.asteroids.forEach(asteroid => asteroid.update());
    }

    checkCollisions() {
        for(let i = this.projectiles.length - 1; i >= 0; i--) {
            const projectile = this.projectiles[i];

            for(let j = this.asteroids.length - 1; j >= 0; j--) {
                const asteroid = this.asteroids[j];

                if(projectile.isColliding(asteroid, asteroid.radius)) {
                    asteroid.remove();
                    this.asteroids.splice(j, 1);

                    projectile.remove();
                    this.projectiles.splice(i, 1);

                    this.score += 10;
                    this.scoreDisplay.textContent = `Score: ${this.score}`;

                    break;
                }
            }
        }

        for(let i = 0; i < this.asteroids.length; i++) {
            const asteroid = this.asteroids[i];

            if(this.spaceship.isColliding(asteroid, 30)) {
                this.gameOver()
                break;
            }
        }
    }

    gameOver() {
        this.active = false;

        this.gameScreen.style.display = 'none';
        this.gameOverScreen.style.display = 'flex';
        this.finalScore.textContent = `FINAL SCORE: ${this.score}`;
    }

    handleKeyDown(e) {
        this.keys[e.key] = true;

        if(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
            e.preventDefault();
        }
    }

    handleKeyUp(e) {
        this.keys[e.key] = false;
    }
}