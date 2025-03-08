class Game {
    constructor() {
        this.active = false;
        this.score = 0;
        this.keys = {};
        this.projectileCount = 0;
        this.asteroidCount = 0;
        this.projectiles = [];
        this.asteroids = [];
        this.bossProjectiles = [];
        this.boss = null;
        this.miniBosses = []; 
        this.bossSpawnThreshold = 100;
        this.bossActive = false;
        this.bossDefeated = false;
        this.miniBossSpawnActive = false; 
        this.bestScore = this.getBestScore();
        this.soundManager = new SoundManager();
        this.splashScreen = document.getElementById('splash-screen');
        this.gameScreen = document.getElementById('game-screen');
        this.gameOverScreen = document.getElementById('game-over-screen');
        this.scoreDisplay = document.getElementById('score-display');
        this.finalScore = document.getElementById('final-score');
        this.bestScoreDisplay = document.getElementById('best-score-display');
        this.createMuteButton();
        this.updateBestScoreDisplay();

        this.spaceship = new Spaceship();
        
        window.game = this;
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.gameLoop = this.gameLoop.bind(this);

        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('keyup', this.handleKeyUp);
    }

    createMuteButton() {
        const muteContainer = document.createElement('div');
        muteContainer.id = 'mute-container';
        muteContainer.style.position = 'absolute';
        muteContainer.style.top = '15px';
        muteContainer.style.left = '15px';
        muteContainer.style.zIndex = '1000';
        this.muteButton = document.createElement('button');
        this.muteButton.id = 'mute-button';
        this.muteButton.className = 'button';
        this.muteButton.style.padding = '6px 12px';
        this.muteButton.style.marginTop = '0';
        this.muteButton.textContent = '🔊';
        this.muteButton.addEventListener('click', () => {
            const isMuted = this.soundManager.toggleMute();
            this.muteButton.textContent = isMuted ? '🔇' : '🔊';
        });
        
        muteContainer.appendChild(this.muteButton);
        document.getElementById('game-container').appendChild(muteContainer);
    }

    getBestScore() {
        const bestScore = localStorage.getItem('bestScore');
        return bestScore ? parseInt(bestScore) : 0;
    }

    saveBestScore(score) {
        localStorage.setItem('bestScore', score.toString());
        this.bestScore = score;
    }

    updateBestScoreDisplay() {
        if (this.bestScoreDisplay) {
            this.bestScoreDisplay.textContent = `Best Score: ${this.bestScore}`;
        }
    }

    start() {
        this.active = true;
        this.score = 0;
        this.projectileCount = 0;
        this.asteroidCount = 0;
        this.bossActive = false;
        this.bossDefeated = false;
        this.miniBossSpawnActive = false;
        this.soundManager.startMusic();

        this.projectiles.forEach(projectile => projectile.remove());
        this.asteroids.forEach(asteroid => asteroid.remove());
        this.bossProjectiles.forEach(projectile => projectile.remove());
        
        if (this.boss) {
            this.boss.remove();
            this.boss = null;
        }
        
        this.miniBosses.forEach(miniBoss => miniBoss.remove());
        this.miniBosses = [];
        
        this.projectiles = [];
        this.asteroids = [];
        this.bossProjectiles = [];

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
        
        if (this.bossActive && this.boss) {
            this.boss.update();
        }
        
        this.updateMiniBosses();
        this.updateBossProjectiles();
        this.checkCollisions();
        this.checkBossSpawn();
        requestAnimationFrame(this.gameLoop);
    }
    
    updateMiniBosses() {
        this.miniBosses.forEach(miniBoss => miniBoss.update());
    }
    
    spawnMiniBoss() {
        if (!this.active || !this.miniBossSpawnActive) return;
        
        const miniBoss = MiniBoss.createRandom();
        this.miniBosses.push(miniBoss);
        setTimeout(() => this.spawnMiniBoss(), 10000 + Math.random() * 20000); 
    }
    
    startMiniBossSpawning() {
        if (!this.miniBossSpawnActive) {
            this.miniBossSpawnActive = true;
            setTimeout(() => this.spawnMiniBoss(), 5000); 
        }
    }
    
    checkBossSpawn() {
        if (!this.bossActive && !this.bossDefeated && this.score >= this.bossSpawnThreshold && !this.boss) {
            this.spawnBoss();
        }
    }
    
    spawnBoss() {
        this.boss = Boss.createRandom();
        this.bossActive = true;
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
            const projectile = this.spaceship.shoot(this.projectileCount++);
            this.projectiles.push(projectile);
            
            this.soundManager.play('projectile');
            
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
    
    updateBossProjectiles() {
        for(let i = this.bossProjectiles.length - 1; i >= 0; i--) {
            if(!this.bossProjectiles[i].update()) {
                this.bossProjectiles[i].remove();
                this.bossProjectiles.splice(i, 1);
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
            let projectileRemoved = false;

            for(let j = this.asteroids.length - 1; j >= 0; j--) {
                const asteroid = this.asteroids[j];

                if(projectile.isColliding(asteroid, asteroid.radius)) {
                    asteroid.remove();
                    this.asteroids.splice(j, 1);

                    projectile.remove();
                    this.projectiles.splice(i, 1);
                    projectileRemoved = true;
                    this.soundManager.play('destruction');

                    this.score += 10;
                    this.scoreDisplay.textContent = `Score: ${this.score}`;

                    break;
                }
            }
            
            if (projectileRemoved) continue;

            if (this.bossActive && this.boss) {
                if (projectile.isColliding(this.boss, this.boss.radius)) {
                    projectile.remove();
                    this.projectiles.splice(i, 1);
                    projectileRemoved = true;
                    if (!this.boss.hit()) {
                        this.boss.remove();
                        this.boss = null;
                        this.bossActive = false;
                        this.bossDefeated = true;
                        this.soundManager.play('shipDestruction');
                        
                        this.score += 50; 
                        this.scoreDisplay.textContent = `Score: ${this.score}`;
                        this.bossProjectiles.forEach(p => p.remove());
                        this.bossProjectiles = [];
                        this.startMiniBossSpawning();
                    }
                }
            }
            
            if (projectileRemoved) continue;
            
            for(let j = this.miniBosses.length - 1; j >= 0; j--) {
                const miniBoss = this.miniBosses[j];

                if(projectile.isColliding(miniBoss, miniBoss.radius)) {
                    projectile.remove();
                    this.projectiles.splice(i, 1);
                    projectileRemoved = true;
                    
                    if (!miniBoss.hit()) {
                        miniBoss.remove();
                        this.miniBosses.splice(j, 1);
                        
                        this.soundManager.play('shipDestruction');
                        
                        this.score += 25; 
                        this.scoreDisplay.textContent = `Score: ${this.score}`;
                    }
                    break;
                }
            }
        }

        for(let i = 0; i < this.asteroids.length; i++) {
            const asteroid = this.asteroids[i];
            if(this.spaceship.isColliding(asteroid, 30)) {
                this.gameOver();
                break;
            }
        }
        
        for(let i = 0; i < this.bossProjectiles.length; i++) {
            const projectile = this.bossProjectiles[i];
            
            if(this.spaceship.isColliding(projectile, 15)) {
                projectile.remove();
                this.bossProjectiles.splice(i, 1);
                this.gameOver();
                break;
            }
        }
        

        for(let i = 0; i < this.miniBosses.length; i++) {
            const miniBoss = this.miniBosses[i];
            
            if(this.spaceship.isColliding(miniBoss, 25)) {
                this.gameOver();
                break;
            }
        }
    }

    gameOver() {
        this.active = false;
        
 
        this.soundManager.play('shipDestruction');
        this.soundManager.stopMusic();

        if (this.score > this.bestScore) {
            this.saveBestScore(this.score);
            this.updateBestScoreDisplay();
        }

        this.gameScreen.style.display = 'none';
        this.gameOverScreen.style.display = 'flex';
        this.finalScore.textContent = `FINAL SCORE: ${this.score}`;
        
        const bestScoreElement = document.getElementById('best-score');
        if (bestScoreElement) {
            bestScoreElement.textContent = `BEST SCORE: ${this.bestScore}`;
        }
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